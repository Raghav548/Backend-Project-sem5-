const express = require("express");

const router = express.Router();

const { Users , markAttendance}= require("../models/student");
const {verifyToken} = require("./auth");
console.log('admin routes loaded');

// router.get("/attendance",verifyToken, async (request, response) => {

//   const students = await Users.find();
    
//   response.json(students);
    
// })

router.post("/attendance",verifyToken, (request, response) => {
  const stuDetails = request.body;
  console.log(stuDetails);

  markAttendance(stuDetails.rollnos, stuDetails.attendance);

  response.status(200).send("Attendance marked successfully");

})


router.get("/student", verifyToken, async (request, response) => {

  const students = await Users.find();

  response.json(students);

  // response.render("admin/student-info", {pageTitle : "Attendance", path : "/admin/student", students : students, user:request.session.user});

})

module.exports = router;