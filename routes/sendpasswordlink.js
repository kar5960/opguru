const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const { models } = require("../models/index.js");
const User = models.userauth;

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }
  try {
    const userfind = await User.findOne({ where: { email } }).catch((err) => {
      res.status(401).send("User not registered");
      console.log("Error: ", err);
    });
    // token generate for reset password
    const token = jwt.sign(
      { _id: userfind.id },
      process.env.SECRET_TOKEN_EMAIL,
      {
        expiresIn: "300s",
      }
    );
    userfind.set({
      emailToken: token,
    });
    const setusertoken = await userfind.save();
    if (setusertoken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 2 MINUTES http://opguru.azurewebsites.net/forgotpassword/${userfind.id}/${setusertoken.emailToken}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res
            .status(401)
            .json({
              status: 401,
              message: "Email not send , Please try again",
            });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

module.exports = router;
