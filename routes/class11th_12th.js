const express = require("express");
const router = express.Router();

// TODO : modify logic for 11th graders
const { sequelize } = require("../models/index.js");
// Therefore we extracted models object from sequelize array
const {class11th_12th} = sequelize.models;

router.post("/", async (req, res) => {
  console.log("req body is ",req.body);
    try {
      // Extract the personal details from the request body
      const {
        userID,
        currentclass,
        currentstream, 
        schoolBoard,
        olympiadpartipated, 
        olympiadinterested, 
        class10thboard , 
        class10percent ,
        futurefields , 
        budget,
        aggregatepercent ,
        interestedregions,
        BestOfFive , 
        exams,
    } = req.body;
  
      // Save the personal details to the database
      
      const newUser = await class11th_12th.create({
        currentclass : currentclass, 
        currentstream ,
        class10percent : class10percent ,
        schoolBoard : schoolBoard ,
        userID: userID,
        budget ,
        class10thboard : class10thboard ,
        aggregatepercent : aggregatepercent, 
        olympiadparticipated : olympiadpartipated ,
        olympiadinterested : olympiadinterested ,
        interestedregions : interestedregions,
        exams ,
        BestOfFive : BestOfFive ,
        futurefields : futurefields ,
      });
      console.log("new User is ",newUser);
      // Respond with the newly created user
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error submitting 11th-12th details:", error);
  
      // Handle Sequelize errors
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ error: "Validation error. Check your data." });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

module.exports = router;