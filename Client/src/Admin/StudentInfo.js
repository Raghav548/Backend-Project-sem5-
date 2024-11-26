import '../Styles/attendance.css';
import {useState, useEffect} from 'react';

export default function Info () {

  const [studentList, setStudentList] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/api/admin/student", { method : "GET" });
    const data = await response.json();
    console.log(data);
    setStudentList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
      studentList.length === 0 ? (
        <h1>Nothing Yet !!</h1>
      ) : (

        studentList.map((student, index) => {
          const {fullname, rollno} = student;

          // Provide default values for null attendance ->
          const attended = student?.attendance?.attended ?? "N/A";
          const delivered = student?.attendance?.delivered ?? "N/A";
          const percentage = student?.attendance?.percentage ?? "N/A";
          // Nullish Coalescing Operator (??): If the values of attended, delivered, or percentage are null or undefined, they will fall back to "N/A" (or any other default value you prefer).

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

      )
  );
};