const express = require("express");
const { sequelize } = require("../models/index.js");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string(),
  phno: Joi.string().required(),
  userID: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(5).max(1024).required(),
});


const { userauth } = sequelize.models;
const { users } = sequelize.models;

router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, userID, phno, password,loginroute } = req.body;

  try {
    // Check if user with the same phone number already exists
    const alreadyExistsPhno = await userauth.findOne({
      where: { phno },
    });

    if (alreadyExistsPhno) {
      console.log("already existing user is ",alreadyExistsPhno);
      return res.status(409).send("User already exists! Please login");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUserAuth = await userauth.create({
      name,
      email,
      userID,
      phno,
      password: hashedPassword,
      loginroute:loginroute
    });

    const newUser = await users.create({
      userID
    });
    
    res.send("User registration successful");
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Cannot register user at the moment!");
  }
});

module.exports = router;
