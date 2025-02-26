import React from "react";
import '../Styles/info.css';

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 500, currency: "INR" }),
        }
      );

      if (!response.ok) {
        console.error("Failed to create order:", await response.text());
        return;//it exits the function if the order creation fails.
      }

      const { orderId, amount } = await response.json();//Parses the JSON response from the server.and Extracts the order ID and the amount from the response.
      

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Campus Sphere",
        description: "Course Transaction",
        order_id: orderId,//ID of the Razorpay order created earlier.

        //below handler is the callback function that is trigerred after successfull payment.
        handler: async (response) => {
          const verifyResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );
          const verifyData = await verifyResponse.json();
          alert(verifyData.message);
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9XXXXXXXXX",
        },
        theme: { color: "#3399cc",
          
         },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
// window.Razorpay: Refers to the Razorpay object loaded via the Razorpay SDK in the browser.
// new Razorpay(options): Creates a Razorpay instance using the specified options.
// rzp.open(): Opens the Razorpay payment interface for the user.
    } catch (error) {
      console.error("Error during payment:", error);
    }

  };
  return (
    <div>

      <h1></h1>

      <div 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <button
          onClick={handlePayment}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Pay Now
        </button>

      </div>

    </div>
  );
};

export default PaymentPage;
