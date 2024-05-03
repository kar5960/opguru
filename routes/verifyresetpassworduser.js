const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { models } = require("../models/index.js");
const User = models.userauth;

router.get("/", async (req, res) => {
  const id = req.query.id;
  const token = req.query.token;
  try {
    const validuser = await User.findAll({
      where: {
        id: id,
        emailToken: token,
      },
    });
    // console.log(validuser);
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN_EMAIL);
    // console.log(verifyToken);
    if (validuser && verifyToken) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
