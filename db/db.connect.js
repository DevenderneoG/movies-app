const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch(error => console.log("Error connecting to Database", error));
};

module.exports = { initializeDatabase };


