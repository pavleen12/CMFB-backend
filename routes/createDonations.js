const express = require("express");
const Donations = require("../model/Donation");
const router = express.Router();
const { query, validationResult } = require("express-validator");

router.post("/donate", async (req, res) => {
  
    try {
      //user created
      await Donations.create({
        donation_type: req.body.donation_type,
        donation_article: req.body.donation_article,
        donation_amount: req.body.donation_amount,
        donation_datetime: req.body.donation_datetime,
        user_id: req.body.user_id,
        donation_id: req.body.donation_id
      });
  
      const newUser = new Users();

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;