const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const attendanceSchema = new mongoose.Schema(
  {
    attended : {type : Number, required : true},
    delivered : {type : Number, required : true},
    percentage : {type : Number, required : true}
  }
)

const studentSchema = new mongoose.Schema(
  {
    username : {type : String, required : true},
    password: { type: String,required: true },
    fullname : { type : String},
    rollno: { type: Number },
    dob: { type: String },
    email: { type: String},
    mobno: { type: String },
    gender: { type: String },
    father: { type: String },
    mother: { type: String },
    bldgrp: { type: String },
    city: { type: String },
    state: { type: String },
    nat: { type: String },
    attendance : attendanceSchema
  }
)

// *********************************************************************************************************

// pre-save hooks are functions that run before saving a document to the database.

studentSchema.pre('save', async function(next) { // We can use "this" keyword inside non-arrow functions only.

  if(this.isNew){ // this.isNew property return true if the document is new and not saved inside mongoose.

    // Generate a salt (default rounds = 10)
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})

const Users = mongoose.model('Users', studentSchema);

// *********************************************************************************************************
// Function to markAttendance
async function markAttendance(rollnos, attendance){

  const students = await Users.find(); // find() returns an array of student objects
  
  for (let i = 0; i < rollnos.length; i++) {

    // Check if the student exists in the 'students' array
    let student = students.find(s => s.rollno === rollnos[i]);

    // If student doesn't exist
    if(!student.attendance){
      student.attendance = {
          attended : attendance[i] === 'present' ? 1 : 0,
          delivered : 1,
          percentage : 0
        }

      await student.save();
    }

    // If student exists
    else {
      student.attendance.delivered++;

      if (attendance[i] === 'present') student.attendance.attended++;

      let per = (student.attendance.attended / student.attendance.delivered) * 100;

      // per * 100 shifts the decimal point two places to the right, like "85.71428571428571" becomes "8571.428571428571".
      // Math.round() rounds the number to the nearest whole number, like "8571.428571428571" becomes "8571".
      // / 100 shifts the decimal point back two places to the left, giving you the number rounded to two decimal places, like , like "8571" becomes "85.71".
      student.attendance.percentage = Math.round(per * 100) / 100;
      
      // Saving the updated student data to the database
      await student.save();
    }

  }

};

module.exports = {Users, markAttendance};
