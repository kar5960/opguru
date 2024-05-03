const express = require("express");
const { sequelize } = require("../models/index.js");
const router = express.Router();
const bcrypt = require("bcrypt");


const { userauth } = sequelize.models;

const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { phno, password } = req.body;

  const userWithPhno = await userauth.findOne({ where: { phno } }).catch((err) => {
    console.log("Error: ", err);
  });

  console.log("user in login backend route is ",userWithPhno);

  if (!userWithPhno)
    return res.status(400).send("User does not exist ! Plese Register");

  const validPassword = await bcrypt.compare(password, userWithPhno.password);
  if (!validPassword) return res.status(400).send("Incorrect Password ! ");
  
  // create JWTs
    const accessToken = jwt.sign(
      { "phno": userWithPhno.dataValues.phno},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '100s' }
  );
  const refreshToken = jwt.sign(
      { "username": userWithPhno.dataValues.phno },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
  );
    console.log("accessToken is ",accessToken);
    console.log("refresh token is",refreshToken);

  // Saving refreshToken with current user
  // Update the user record in database with the new refresh token
    const updatedUser = await userauth.update(
      { refreshToken: refreshToken },
      { where: { phno:  userWithPhno.phno} }
    );

    if (updatedUser[0] === 1) {
      // User record updated successfully
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ message: 'Login successful', accessToken: accessToken, id:userWithPhno.id,name:userWithPhno.name,email:userWithPhno.email,userID : userWithPhno.userID,loginroute : userWithPhno.loginroute});
    } else {
      // User record not found or not updated
      res.status(401).json({ message: 'Refresh token not generated by backend' });
    }
});

module.exports = router;