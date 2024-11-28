const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema(
  {
    username : { type: String, required: true },
    password : { type: String, required: true }
  }
)

AdminSchema.pre('save', async function(next) {
  if(this.isNew){
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


const Admins = mongoose.model('Admins', AdminSchema);

module.exports = Admins;