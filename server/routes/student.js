const express = require('express');

const router = express.Router();

const { Users } = require('../models/student');

router.get("/student/:name", async (request, response) => {

  const {name} = request.params;

  const student = await Users.findOne( {fullname : name} );

  // response.render("student/info", {pageTitle : "Student page", path : "/student", user : request.session.user, student : student});
  response.json(student);

})

router.post("/register", async (request, response) => {

  const {fullname, rollno, dob, email, mobno, gender, father, mother, bldgrp, city, state, nat} = request.body;
  console.log(request.body);

  // const user = await Users.findOne( { username : request.session.user.name } )

  // Object.assign(user, {fullname, rollno, dob, email, mobno, gender, father, mother, bldgrp, city, state, nat}) // Easy way to assign values to an object in js

  // await user.save();

  await Users.create(
    {fullname, rollno, dob, email, mobno, gender, father, mother, bldgrp, city, state, nat}
  );

  response.status(200).send("Registration successful!"); // Sending response to the client side for "response.ok" to work on that side

  // response.redirect(`/student/${request.session.user.name}`);

})

router.get("/attendance/:name", async (request, response) => {

  const {name} = request.params;

  // const student = await Users.findOne( {fullname : name} );
  // console.log(student);

  const student = await Users.findOne( {fullname : name} );

  response.json(student);

  // response.render("student/attendance", {pageTitle : "Attendance", path : "/attendance", student : student, studentAttendance : studentAttendance, user : request.session.user});
  
})


module.exports = router;