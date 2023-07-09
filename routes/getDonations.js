const express = require("express");
const mongoose = require("mongoose");
const Donations = require("../model/Donation");
const router = express.Router();

router.get("/getAllDonations", async (req, res) => {
  try {
    const Donations = mongoose.model("Donations");

    const fetchedusers = await Donations.find({});
    res.json(fetchedusers); // Return the users as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations" });
  }
});

module.exports=router;