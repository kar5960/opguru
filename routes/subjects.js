const express = require("express");
const router = express.Router();

const { models } = require("../models/index.js");
// Therefore we extracted models object from sequelize array
const Subjects = models.subjects;

router.get("/", async (req, res) => {
  const data = await Subjects.create({
    id: 1,
    Subject: "Physics",
  });
  console.log(data);
  data.save();
  //   res.status(200).json(data);
});

module.exports = router;
