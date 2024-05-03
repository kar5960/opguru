const express = require('express');
const router = express.Router();
const { models } = require("../models/index.js");
const interestedfields = models.interestedfields;
router.get('/', async (req, res) => {
  try {
    const interestedfieldsList = await interestedfields.findAll();
    res.json(interestedfieldsList);
  } catch (error) {
    console.error('Error fetching Intreestedfieldlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
