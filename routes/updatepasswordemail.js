const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { models } = require("../models/index.js");
const User = models.userauth;

router.post("/", async (req, res) => {
  const { id, token, password } = req.body;
  try {
    const validuser = await User.findAll({
      where: {
        id: id,
        emailToken: token,
      },
    });
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN_EMAIL);
    if (validuser && verifyToken._id) {
      const oldpassword = validuser[0].password;
      console.log("old password is ", oldpassword);
      const validPassword = await bcrypt.compare(password, oldpassword);
      if (validPassword) {
        res.status(401).json({
          status: 401,
          message: "New Password must be different from the old password",
        });
      }
      const newpassword = await bcrypt.hash(password, 10);
      const setnewuserpass = await User.findOne({ where: { id } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
      );
      setnewuserpass.set({
        password: newpassword,
      });
      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    console.log("error encountered");
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
