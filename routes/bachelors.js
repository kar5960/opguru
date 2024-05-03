const express = require("express");
const router = express.Router();

// TODO : modify logic for 11th graders
const { sequelize } = require("../models/index.js");
// Therefore we extracted models object from sequelize array
const {bachelors} = sequelize.models;

router.post("/", async (req, res) => {
  console.log("req body is ",req.body);
    try {
      // Extract the personal details from the request body
      const {
        userID ,
        tenthBoard,
        olympiadpartipated , 
        twelthBoard,
        tenthPercentage,
        twelthPercentage ,
        exams , 
        interestedregions ,
        intern ,
        college ,
        year ,
    } = req.body;
  
      // Save the personal details to the database
      
      const newUser = await bachelors.create({
        user_id : userID ,
        collegename : college ,
        collegeyear : year ,
        tenthBoard,
        olympiadparticipated :olympiadpartipated , 
        twelthBoard,
        tenthPercentage,
        twelthPercentage ,
        exams , 
        interestedregions ,
        intern ,
      });
      console.log("new User is ",newUser);
      // Respond with the newly created user
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error submitting bachelors details:", error);
  
      // Handle Sequelize errors
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ error: "Validation error. Check your data." });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

module.exports = router;