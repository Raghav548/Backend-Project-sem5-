import { useEffect, useState } from 'react';
import '../Styles/info.css';
import {NavLink } from 'react-router-dom';

import Navigation from '../Common/Navigation.js'

const Info = () => {

  const [formData, setFormData] = useState(
      {
        fullname: "",
        rollno: "",
        dob: "",
        email: "",
        mobno: "",
        gender: "",
        father: "",
        mother: "",
        bldgrp: "",
        city: "",
        state: "",
        nat: "",
      }
  )


  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/student-info`, { method: "GET" , credentials: "include"});

      const data = await response.json();
      console.log(data);
      setFormData(data.student);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
      <>
      <Navigation/>
      {formData && formData.fullname? (
        <div className="student-card">
          <h2>Student Details</h2>
          <br />
          <p>
            <strong>Name :</strong> {formData.fullname}
          </p>
          <p>
            <strong>Roll Number :</strong> {formData.rollno}
          </p>
          <p>
            <strong>Date Of Birth :</strong> {formData.dob}
          </p>
          <p>
            <strong>Email :</strong> {formData.email}
          </p>
          <p>
            <strong>Mobile Number :</strong> {formData.mobno}
          </p>
          <p>
            <strong>Gender :</strong> {formData.gender}
          </p>
          <p>
            <strong>Father's Name :</strong> {formData.father}
          </p>
          <p>
            <strong>Mother's Name :</strong> {formData.mother}
          </p>
          <p>
            <strong>Blood Group :</strong> {formData.bldgrp}
          </p>
          <p>
            <strong>City :</strong> {formData.city}
          </p>
          <p>
            <strong>State :</strong> {formData.state}
          </p>
          <p>
            <strong>Country :</strong> {formData.nat}
          </p>
        </div>
      ) : (
        <div>
          <h1 className='white-heading'>Register Here !!</h1>
          <NavLink to="/register" className="registerBtn">
            <button>Register</button>
          </NavLink>
        </div>
      )}
      </>
  );
}

export default Info;
