import "../Styles/attendance.css"
import {useState, useEffect} from 'react';

import Navigation from '../Common/Navigation.js'

const Attendance = () => {

  const [studentAttendance, setstudentAttendance] = useState({});

  let username = "";
  const fetchData = async () => {
    try{
      const response = await fetch(`http://localhost:4000/attendance/fetchAttendance`, {method : "GET"});
      const data = await response.json();
      console.log(data);
      username = data.username;
      const {studentAttendance } = data;
      setstudentAttendance(studentAttendance);
    } catch(err) {
      console.log("Error in fetching single student data");
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>

      <Navigation />
      <h1 className="white-heading">Attendance</h1>
      
      {username ? (
        studentAttendance.fullname ? (
          // When student is registered, and attendance is uploaded
          <div className="attendance-card">
            <h3>Subject</h3>
            <p>
              <strong>Name:</strong> {studentAttendance.fullname}
            </p>
            <p>
              <strong>Roll Number:</strong> {studentAttendance.rollno}
            </p>
            <p>
              <strong>Attended:</strong> {studentAttendance.attended}
            </p>
            <p>
              <strong>Absent:</strong>{" "}
              {studentAttendance.delivered - studentAttendance.attended}
            </p>
            <p>
              <strong>Delivered:</strong> {studentAttendance.delivered}
            </p>
            <p>
              <strong>Total Percentage:</strong>{" "}
              {studentAttendance.percentage}%
            </p>
          </div>
        ) : (
          // When student is registered but attendance is not uploaded
          <div className="attendance-card">
            <h2>Not Uploaded Yet !!</h2>
          </div>
        )
      ) : (
        // When student is not registered and attendance is not uploaded
        <div className="attendance-card">
          <h2>Not Uploaded Yet !!</h2>
        </div>
      )}
    </div>
  );
};

export default Attendance;