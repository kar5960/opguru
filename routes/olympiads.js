const express = require('express');
const router = express.Router();
const { models } = require("../models/index.js");
const olympiads = models.olympiads;
router.get('/', async (req, res) => {
  try {
    const olympiadsList = await olympiads.findAll();
    res.json(olympiadsList);
  } catch (error) {
    console.error('Error fetching Olympiads:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
