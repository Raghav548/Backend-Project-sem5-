import '../Styles/attendance_admin.css'; 
import '../Styles/footer.css';
import Footer from '../Common/Footer';

import {useState, useEffect} from 'react';

export default function Attendance() {

  // Logic to fetch student fullname and rollno from API ->
  const [studentData, setStudentData] = useState([]);

  const fetchData = async () => {
    try{
      const response = await fetch("http://localhost:4000/api/admin/student", {method : "GET"});
      const data = await response.json();
      setStudentData(data);
    } catch(err) {
      console.log("Error while fetching attendance");
    }
  }

  useEffect(() => {
    fetchData();
  }, []); 

  // -------------------------------------------------------------------------------------------------------------------------------------------------------
  // Logic to send request body to the API ->

  const [attendanceData, setAttendanceData] = useState([]);

  // The second argument of useEffect ([studentData]) tells React to only run the effect when the studentData array changes.
  // After the data is fetched and studentData is populated (via setStudentData), useEffect will be triggered.
  useEffect(() => {
    setAttendanceData(studentData.map(() => 'present'));  // Default value of attendanceData is set to all 'present'
  }, [studentData]);


  // Updating the attendanceData state when a dropdown value changes ->
  const handleAttendanceChange = (index, value) => {
    if (value === 'absent') {
      setAttendanceData((prevData) => { // setter function can also take a callback arrow function, run logic inside the arrow function and return the updated value like this.
        const updatedArr = [...prevData]; // Create a copy of the target array
        updatedArr[index] = value; // Update the value at the given index
        return updatedArr;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission, which reloads the whole page on submission

    // Creating the request body object
    const requestBody = {
      rollno: studentData.map((student) => student.rollno),
      attendance: attendanceData,
    };

    console.log(requestBody);

    // Sending the data to the backend API
    try {
      const response = await fetch("http://localhost:4000/admin/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Attendance submitted successfully!");
      } else {
        alert("Failed to submit attendance.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance.");
    }
  };
  
  // ----------------------------------------------------------------------------------------------------------
  return (
    <div>
      <h1 className='white-heading'>Attendance</h1>

      <main>
        <form onSubmit={handleSubmit}>
          {studentData.length > 0 ? (

            <div className="grid">
              {studentData.map((student, index) =>

                student.fullname && student.rollno ? (

                  <div className="std-card" key={index}>
                    <img src="../images/Profile.png" alt="Profile" />

                    <p>{student.fullname}</p>

                    <p>{student.rollno}</p>

                    <select
                      name="attendance"
                      id="attendance"
                      value={attendanceData[index]}
                      onChange={(e) => handleAttendanceChange(index, e.target.value)}
                      className="attendance-dropdown"
                      required
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </div>

                ) : null
              )}
            </div>
          ) : (
            <h1 className='white-heading'>Nothing Yet !!</h1>
          )}

          <div className="btn">
            <button type="submit">Submit</button>
          </div>

        </form>
      </main>

      <section className="call-to-act">
        <h2>Take Control of Attendance Now!</h2>
        <p>Empower your teaching with easy attendance management.</p>
        <button id="btn-j">Update</button>
        <button id="btn-j">Modify</button>
      </section>

      <Footer/>
    </div>
  );
}
