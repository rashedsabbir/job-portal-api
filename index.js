const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");

// database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.poglh.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri).then(() => {
  console.log(`Successfully connected to database`.blue.bold);
});

// server
const port = process.env.PORT || 5000;
const crypto = require("crypto");
app.listen(port, () => {
  console.log(`http://localhost:${port}`.yellow.bold);
});