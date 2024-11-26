const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();

// Connecting Express with MongoDB ->
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Allowing cross-origin requests for your React client ->
app.use(cors());

const userRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

app.use(express.json()); // to parse the request body object coming from client

app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server starting at http://localhost:${port}`);
});