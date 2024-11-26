import "../Styles/login_signup.css"

const SignUpPage = () => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  //   rememberMe: false,
  // });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add form submission logic here
  //   console.log("Form submitted with data: ", formData);
  // };

  const error = null;

  return (
    <div className="body">
      <nav className="login-page-using-auto-layoyut-7">
        <div className="login-form-7">
          <div className="frame-27">
            <div className="text-55">Sign Up</div>
            {error && (
              <p style={{ color: "red", marginTop: 0, marginBottom: 0 }}>
                {error}
              </p>
            )}
            <form action="/signUp" method="POST">                  {/*Form begins here*/}
              <div className="username-field-3">
                <div className="text-56">USERNAME</div>
                <input
                  type="text"
                  className="username_input"
                  name="username"
                  // value={formData.username}
                  // onChange={handleChange}
                  required
                />
              </div>

              <div className="password-field-3">
                <div className="text-56">PASSWORD</div>
                <input
                  type="password"
                  className="password_input"
                  name="password"
                  // value={formData.password}
                  // onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="sign_in_button-14">
                <div className="text-57">Sign Up</div>
              </button>

              <div className="signin_sols-8">
                <div className="remember_me-8">
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="rememberMe"
                    className="checkbox"
                    // checked={formData.rememberMe}
                    // onChange={handleChange}
                  />
                  <div className="text-58">Remember Me</div>
                </div>
                <div className="text-59">Forgot Password?</div>
              </div>
            </form>                            {/*Form ends here*/}
          </div>

          <div className="frame-28">
            <div className="welcome-to-login-17">
              <span className="welcome-to-login-18">Welcome To</span>
              <span className="welcome-to-login-19"> Sign Up </span>
            </div>
            <div className="text-60">Already have an account?</div>
            <button
              onClick={() => (window.location.href = "http://localhost:3000/login")}
              className="sign_up_button-6"
            >
              <div className="text-61">Log In</div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SignUpPage;
