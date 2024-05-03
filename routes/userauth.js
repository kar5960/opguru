const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const userLoginSchema = Joi.object({
  //   phno: Joi.string().min(2).max(50).required(),
  //   password: Joi.string().min(5).max(1024).required(),
  // });
  // router.post("/", async (req, res) => {
  //   console.log(req.body);
  //   const { error, value } = userLoginSchema.validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);
  //   let user = await User.findOne({ phno: req.body.phno });
  //   if (!user) return res.status(400).send("Invalid email or password.");
  //   const validPassword = await bcrypt.compare(req.body.password, user.password);
  //   if (!validPassword) return res.status(400).send("Invalid email or password.");
  //   res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
