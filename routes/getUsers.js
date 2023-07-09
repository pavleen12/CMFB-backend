const express = require("express");
const mongoose = require("mongoose");
const Users = require("../model/Users");
const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
  try {
    const Users = mongoose.model("Users");
    console.log("Hi");
    const fetchedusers = await Users.find({});
    // const users = await Users.find(); // Fetch all users from the User collection
    res.json(fetchedusers); // Return the users as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports=router;