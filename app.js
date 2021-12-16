require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");

const app = express();

app.use(express.json());

//login goes here===================================

const User = require("./models/User.js");

//register
app.post("/register", async (req, res) => {
  try {
    //get user input
    const { first_name, last_name, email, password } = req.body;

    //validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("all input is required");
    }

    //check if user already exist
    //validate if user exist in DB

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).send("User is exist. Please Login");
    }

    //encrypt password
    encryptedPassword = await bcrypt.hash(password, 10);

    //create user in DB
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      }.process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", (req, res) => {});

module.exports = app;
