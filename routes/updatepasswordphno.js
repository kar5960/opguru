const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { models } = require("../models/index.js");
// Therefore we extracted models object from sequelize array
const User = models.userauth;

router.post("/", async (req, res) => {
  const { phno, password } = req.body;
  try {
    const validuser = await User.findOne({ where: { phno } }).catch((err) => {
      console.log("Error: ", err);
    });
    if (validuser) {
      const validPassword = await bcrypt.compare(password, validuser.password);
      console.log(validPassword, "valid");
      if (validPassword) {
        res.status(401).send("New Password must be different from the old one");
      }
      const newpassword = await bcrypt.hash(password, 10);
      const setnewuserpass = await User.update(
        {
          password: newpassword,
        },
        {
          where: { phno: phno },
        }
      );
      console.log("password updated");
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "  User not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
