const express = require('express');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();

const { Users }= require('../models/user');
const {verifyToken} = require("./auth");

function tokenVerifier(req, res) {
  // Step 1: Extract token
  const token = req.cookies.token;

  if (!token) {
    throw new Error("Unauthorized: Token not found"); // Throw error if no token
  }

  // Step 2: Decode token
  const secretKey = process.env.JWT_SECRET || 'secret'; // Use the same secret key used to sign the token
  try {
    return jwt.verify(token, secretKey); // Decode and verify the token
  } catch (err) {
    throw new Error( err); // Throw error for invalid tokens
  }
}


router.post("/register", async (req, res) => {
  try {
    // Verify and decode token
    const decoded = tokenVerifier(req, res);

    // Ensure decoded token contains the required fields
    if (!decoded.username) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const username = decoded.username;
    const stuDetails = req.body; // Extract student details from request body

    // Update student details
    const updatedStd = await Users.findOneAndUpdate(
      { username }, // Match user by username
      { $set: stuDetails }, // Update with new details
      { new: true } // Return the updated document
    );

    // Handle case where user is not found
    if (!updatedStd) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Registration successful", user: updatedStd });
  } catch (err) {
    // Handle errors (e.g., token verification or database errors)
    console.error("Error in /register route:", err.message);
    res.status(500).json({ message: err.message || "Server error while registration" });
  }
});

router.get("/attendance/fetchAttendance", async (req, res) => {

  try {
    const decoded = tokenVerifier(req,res);
    const username = decoded.username;

    if (!username) {
      return res.status(400).json({ message: "username missing in token" });
    }

    // Step 3: Query database
    const student = await Users.findOne({ username });

    if (!student.attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Step 4: Respond with attendance data
    res.json({student, username});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  // response.render("student/attendance", {pageTitle : "Attendance", path : "/attendance", student : student, studentAttendance : studentAttendance, user : request.session.user});
  
})

router.get("/student-info", async (req, res) => {

  try {
    const decoded = tokenVerifier(req,res);
    const username = decoded.username;  

    if (!username) {
      return res.status(400).json({ message: "username missing in token" });
    }

    // Step 3: Query database
    const student = await Users.findOne({ username });

    if (!student) { 
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Respond with student data
    res.json({student, username});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }  
})



// Multer setup for file uploads ->
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST route to handle form submission ->
router.post("/medical-form-submit", upload.single("file"), async (req, res) => {

  // .single("file") => This specifies that the request expects a single file to be uploaded. The string "file" corresponds to the name attribute of the file input field in the frontend React HTML form.
  try {
    const { name, rollNumber, department, startDate, endDate } = req.body;
    console.log(req.body);
    console.log(req.file.path);

    // Create and save a new document
    const student = await Users.findOne({rollno : Number(rollNumber), fullname : name.trim()});

    console.log("Student document from mongoDB -> ", student);

    const newMedicalRecord = {
      department,
      startDate,
      endDate,
      filePath: req.file.path, // Save the uploaded file's path
    };

    student.medicalRecords.push(newMedicalRecord);

    await student.save();

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;