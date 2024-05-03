const express = require("express");
const router = express.Router();

const { models } = require("../models/index.js");
// Therefore we extracted models object from sequelize array
const UserAuth = models.UserAuth;

router.get("/", async (req, res) => {
  console.log(req.body);
  const data = await Below8th.create({
    currentclass: req.body.currentclass,
    schoolBoard: req.body.schoolboard,
    olympiads: req.body.olympiads,
    user_id: req.body.user_id,
  });
  console.log("data is ", data);
  data.save();
  res.status(200);
});

module.exports = router;
