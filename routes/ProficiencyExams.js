const express = require('express');
const router = express.Router();
const { models } = require("../models/index.js");
const proficiencyexams = models.proficiencyexams;
router.get('/', async (req, res) => {
  try {
    const examsList = await proficiencyexams.findAll();
    res.json(examsList);
  } catch (error) {
    console.error('Error fetching exams :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
