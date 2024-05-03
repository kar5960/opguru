const express = require("express");
const { sequelize } = require("../../models/index.js");
const router = express.Router();


const { users } = sequelize.models;

router.post("/", async (req, res) => {
  console.log("req is ",req.body);
  const { userID , userType } = req.body;

  const foundUser = await users.findOne({ where: { userID } }).catch((err) => {
    console.log("Error: ", err);
  });

  if (!foundUser)
    return res.status(400).send("User doesnt exist, cant save the userType");

  // Saving refreshToken with current user
  // Update the user record in database with the new refresh token
    const updatedUser = await users.update(
      { userType: userType },
      { where: { userID:  foundUser.userID} }
    );
    console.log("updatedUser is ",updatedUser[0]);

    if (updatedUser[0] === 1) {
      // User login route updated successfully
      res.sendStatus(200);
    } else {
      // User record not found or not updated
      res.status(401).json({ message: 'UserType not updated' });
    }
});

module.exports = router;
