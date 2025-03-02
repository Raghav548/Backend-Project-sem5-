const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();

const cloudinary = require('cloudinary').v2;

const { Users }= require('../models/user');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    res.json({student, username, profileimg : student.profileimg});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }  
})

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Multer setup for file handling
const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage });

// Function to upload medical files to Cloudinary
const uploadMedicalsToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: fileName, // Assign a unique filename
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url); // Return Cloudinary URL
      }
    ).end(fileBuffer);
  });
};

router.post("/medical-form-submit", upload.single("file"), async (req, res) => {

  // .single("file") => This specifies that the request expects a single file to be uploaded. The string "file" corresponds to the name attribute of the file input field in the frontend React HTML form.
  try {
    const { name, rollNumber, department, startDate, endDate } = req.body;
    console.log(req.body);
    console.log(req.file.path);

    // Generate a unique file name for Cloudinary
    const fileName = `medical_${rollNumber}_${Date.now()}`;

    // Upload file to Cloudinary with tags
    const cloudinaryUrl = await uploadMedicalsToCloudinary(req.file.buffer, fileName);

    // Create and save a new document
    const student = await Users.findOne({rollno : Number(rollNumber), fullname : name.trim()});

    console.log("Student document from mongoDB -> ", student);

    const newMedicalRecord = {
      department,
      startDate,
      endDate,
      filePath: cloudinaryUrl, // Store Cloudinary URL instead of local path
    };

    student.medicalRecords.push(newMedicalRecord);

    await student.save();

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to upload profile picture files to Cloudinary
const uploadProfilesToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: fileName, // Use unique filename
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url); // Return Cloudinary URL
      }
    ).end(fileBuffer);
  });
};

router.post("/update-profile-pic", upload.single("profileimg"), async (req, res) => {
  try {
    console.log("This is request body -> ", req.body); // Contains the username

    const {username} = req.body;

    // request.file (or request.files in the case of multiple files) is a property that is automatically added to the request object by Multer, a middleware used for handling multipart/form-data requests, such as file uploads.
    console.log("This is the uploaded file -> ", req.file); // Contains the profile image file

    const fileName = `profile_${username}_${Date.now()}`;

    const cloudinaryUrl = await uploadProfilesToCloudinary(req.file.buffer, fileName);

    const student = await Users.findOne({username});

    student.profileimg = cloudinaryUrl;

    await student.save();

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ error: "Profile image Data not saved to DBMS" });
  }
});

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Password validation endpoint
router.post('/validate-password', async (req, res) => {
  const { username, oldPassword } = req.body;

  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password); // Validate password
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Password validated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user details endpoint
router.post('/update-user', async (req, res) => {
  const {oldUsername, username, password, fullname, rollno, email, mobno} = req.body;
  console.log(req.body);

  try {
    const student = await Users.findOne({ username : oldUsername });
    if (!student) {
      return res.status(404).json({ error: 'User not found' });
    }

    if(oldUsername !== username) { // Destroy the cookie if the username is changed
      res.clearCookie('token', {
        httpOnly: true,
      });
    }

    if (username) student.username = username;
    if (password) student.password = password; // You might want to hash passwords before saving
    if (fullname) student.fullname = fullname;
    if (rollno) student.rollno = rollno;
    if (email) student.email = email;
    if (mobno) student.mobno = mobno;

    await student.save();

    return res.status(200).json({ message: 'User details updated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;