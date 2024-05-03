const express = require("express");
const { sequelize } = require("../models/index.js");
const router = express.Router();
const _ = require("lodash");


const { userauth } = sequelize.models;

const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get("/", (req, res) => {
  const cookies = req.cookies;
  console.log("cookies is ",JSON.stringify(cookies?.jwt));
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = userauth.findOne({ where: { refreshToken } }).catch((err) => {
    console.log("Error: ", err);
  });
  if (!foundUser) return res.sendStatus(403); //Forbidden 
// evaluate jwt 


    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.phno !== decoded.phno) return res.sendStatus(403);
            console.log(foundUser.userID);
            const accessToken = jwt.sign(
                { "phno": decoded.phno },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '100s' }
            );
            let userID;
            let name;
            foundUser.then((data)=>{
                console.log("data is ",data);
                userID = data.dataValues.userID;
                name = data.dataValues.name;
                console.log("userID is ",userID);
                console.log("name is ",name);
                res.json({ name,userID,accessToken });
            })
            // res.json({ accessToken });
        }
    );
});

module.exports = router;
