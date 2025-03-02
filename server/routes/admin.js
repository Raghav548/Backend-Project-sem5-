const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const { Users , markAttendance}= require("../models/user");
const {verifyToken} = require("./auth");
console.log('admin routes loaded');

router.post("/attendance",verifyToken, (request, response) => {
  const stuDetails = request.body;
  console.log(stuDetails);

  markAttendance(stuDetails.rollnos, stuDetails.attendance);

  response.status(200).send("Attendance marked successfully");

})

router.get("/student", verifyToken, async (request, response) => {
  try {
    // Fetch all students
    const students = await Users.find();

    // Add profile image logic to each student
    const updatedStudents = students.map((student) => {
      const updatedStd = { ...student.toObject() }; // Convert Mongoose document to JS object

      // Use Cloudinary URL directly
      updatedStd.profileimg = student.profileimg || null; 
      
      return updatedStd;
    });

    // Send the response with updated students
    response.json(updatedStudents);

  } catch (error) {
    console.error("Error fetching students:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;