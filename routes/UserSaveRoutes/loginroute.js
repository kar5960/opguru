const express = require("express");
const { sequelize } = require("../../models/index.js");
const router = express.Router();
const bcrypt = require("bcrypt");


const { userauth } = sequelize.models;

router.post("/", async (req, res) => {
  console.log("Login route request is",req.body);
  const { userID,loginroute } = req.body;

  const foundUser = await userauth.findOne({ where: { userID } }).catch((err) => {
    console.log("Error: ", err);
  });

  if (!foundUser)
    return res.status(400).send("User doesnt exist, cant save new route");

  // Saving refreshToken with current user
  // Update the user record in database with the new refresh token
    const updatedUser = await userauth.update(
      { loginroute: loginroute },
      { where: { userID:  foundUser.userID} }
    );
    console.log("updatedUser is ",updatedUser);

    if (updatedUser[0] === 1) {
      // User login route updated successfully
      res.sendStatus(200);
    } else {
      // User record not found or not updated
      res.status(401).json({ message: 'Login route not updated' });
    }
});

module.exports = router;
