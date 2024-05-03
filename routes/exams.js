const express = require("express");
const router = express.Router();
const { sequelize } = require("../models/index.js");
const { exams } = sequelize.models;
router.post("/", async (req, res) => {
  try {
    // Extract the personal details from the request body
    const {
      userID , examname , score , date  , 
    } = req.body;
    
    // Save the personal details to the database
    const newUser = await exams.create({
      userID , examname , score , date , 
    });

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error submitting exams:", error);

    // Handle Sequelize errors
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ error: "Validation error. Check your data." });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
module.exports = router;