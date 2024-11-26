const express = require("express");

const router = express.Router();

const {Users, markAttendance} = require("../models/student");

// router.get("/attendance", async (request, response) => {

//   const students = await Users.find();
    
//   response.json(students);
    
// })

router.post("/attendance", (request, response) => {
  const stuDetails = request.body;
  console.log(stuDetails);

  markAttendance(stuDetails.rollno, stuDetails.attendance);

  response.status(200).send("Attendance marked successfully");

})


router.get("/student", async (request, response) => {

  const students = await Users.find();

  response.json(students);

  // response.render("admin/student-info", {pageTitle : "Attendance", path : "/admin/student", students : students, user:request.session.user});

})

module.exports = router;