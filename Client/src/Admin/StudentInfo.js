import '../Styles/attendance.css';
import {useState, useEffect} from 'react';

import Navigation from '../Common/Navigation.js'

export default function Info () {

  const [stdList, setStdList] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/admin/student", {method : "GET", credentials: "include"});
    const data = await response.json();
    console.log(data);
    setStdList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navigation />
      {stdList.length === 0 ? (
        <h1>Nothing Yet !!</h1>
      ) : (

        stdList.map((student, index) => {
          if(student.username === "admin") return null;
          
          const { fullname, rollno } = student;

          const attended = student.attendance?.attended ?? "N/A";
          const delivered = student.attendance?.delivered ?? "N/A";
          const percentage = student.attendance?.percentage ?? "N/A";

          return (
            <div className="attendance-card" key={index}>
              <ul style={{ listStyleType: 'none' }}>
                <h3>Name: {fullname}</h3>
                <li>Roll number: {rollno}</li>
                <li>Attended: {attended}</li>
                <li>Delivered: {delivered}</li>
                <li>Percentage: {percentage !== "N/A" ? percentage + "%" : "N/A"}</li>
              </ul> 
            </div>
          );
        })

      )}
    </div>
  );
};