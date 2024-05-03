const express = require("express");
const { sequelize } = require("../models/index.js");
const router = express.Router();


const { users } = sequelize.models;

router.get("/",async (req, res) => {
    
});

module.exports = router;
