import "../Styles/attendance.css"
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';

const Attendance = () => {

  const {name} = useParams();

  const [studentData, setstudentData] = useState({});

  const fetchData = async () => {
    try{
      const response = await fetch(`http://localhost:4000/api/attendance/${name}`, {method : "GET"});
      const data = await response.json();
      console.log(data);
      setstudentData(data);
    } catch(err) {
      console.log("Error in fetching single student data");
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      
      <h1 className="white-heading">Attendance</h1>
      
      {name ? (
        studentData && studentData.attendance ? (
          // When student is registered, and attendance is uploaded
          <div className="attendance-card">
            <h3>Subject</h3>
            <p>
              <strong>Name:</strong> {studentData.fullname}
            </p>
            <p>
              <strong>Roll Number:</strong> {studentData.rollno}
            </p>
            <p>
              <strong>Attended:</strong> {studentData.attendance.attended}
            </p>
            <p>
              <strong>Absent:</strong>{" "}
              {studentData.attendance.delivered - studentData.attendance.attended}
            </p>
            <p>
              <strong>Delivered:</strong> {studentData.attendance.delivered}
            </p>
            <p>
              <strong>Total Percentage:</strong>{" "}
              {studentData.attendance.percentage}%
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