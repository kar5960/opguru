const express = require("express");
const { sequelize } = require("../models/index.js");
const router = express.Router();
const _ = require("lodash");


const { userauth } = sequelize.models;


router.get("/",async (req, res) => {
  // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content message sent
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = userauth.findOne({ where: { refreshToken } }).catch((err) => {
        console.log("Error: ", err);
    });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    await userauth.update({ refreshToken: null }, { where: { refreshToken: refreshToken } });
      // You can also perform additional actions if needed, such as invalidating any existing access tokens
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
    
});

module.exports = router;
