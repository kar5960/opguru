const express = require("express");
const router = express.Router();
const { sequelize } = require("../models/index.js");
const { users } = sequelize.models;
router.post("/", async (req, res) => {
  try {
    // Extract the personal details from the request body
    const {
      firstname,
      lastname,
      gender,
      country,
      city,
      homestate,
      pin,
      userType,
      user_id,
    } = req.body;
    
    // Save the personal details to the database
    const newUser = await users.create({
      firstname,
      lastname,
      gender,
      country,
      city,
      state: homestate,
      pin,
      userType,
      userID: user_id,
    });

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error submitting personal details:", error);

    // Handle Sequelize errors
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ error: "Validation error. Check your data." });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
module.exports = router;