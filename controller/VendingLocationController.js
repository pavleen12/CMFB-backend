const express = require("express");
const VendingLocation = require("../model/VendingLocation");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// VendingLocation CRUD operations
router.post(
  "/addLocations",
  [
    body("foodbank_id").notEmpty().withMessage("Foodbank ID is required"),
    body("user_ids").notEmpty().withMessage("User IDs must be an array"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // const newVendingLocation = await VendingLocation.create(req.body);
      const { foodbank_id, user_ids, location } = req.body;

      // Create a new vending location object
      const newVendingLocation = new VendingLocation({
        foodbank_id,
        user_ids,
        location,
      });

      // Save the new vending location object to the database
      const createdVendingLocation = await newVendingLocation.save();

      res.status(201).json(createdVendingLocation);
    } catch (error) {
      console.error("Error creating vending location:", error);
      res.status(500).json({ message: "Error creating vending location" });
    }
  }
);

// Get all vending locations
router.get("/allVendingLocations", async (req, res) => {
  try {
    const vendingLocations = await VendingLocation.find({});
    res.json(vendingLocations);
  } catch (error) {
    console.error("Error getting vending locations:", error);
    res.status(500).json({ message: "Error getting vending locations" });
  }
});

// Get a vending location by ID
router.get("/vending-location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid donation ID" });
    }

    const vendingLocation = await VendingLocation.findById(req.params.id);
    if (!vendingLocation) {
      return res.status(404).json({ message: "Vending location not found" });
    }
    res.json(vendingLocation);
  } catch (error) {
    console.error("Error getting vending location:", error);
    res.status(500).json({ message: "Error getting vending location" });
  }
});

// Update a vending location by ID
router.put(
  "/vending-locations/:id",
  [
    body("foodbank_id").notEmpty().withMessage("Foodbank ID is required"),
    // body("user_ids").isArray().withMessage("User IDs must be an array"),
    body("user_ids").notEmpty().withMessage("User IDs must be an array"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid donation ID" });
      }
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { foodbank_id, user_ids, location } = req.body;

      const updatedVendingLocation = await VendingLocation.findByIdAndUpdate(
        req.params.id,
        { foodbank_id, user_ids, location },
        { new: true, runValidators: true }
      );

      if (!updatedVendingLocation) {
        return res.status(404).json({ message: "Vending location not found" });
      }

      res.json(updatedVendingLocation);
    } catch (error) {
      console.error("Error updating vending location:", error);
      res.status(500).json({ message: "Error updating vending location" });
    }
  }
);

// Delete a vending location by ID
router.delete("/vending-locations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid donation ID" });
    }

    const deletedVendingLocation = await VendingLocation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVendingLocation) {
      return res.status(404).json({ message: "Vending location not found" });
    }
    res.json({ message: "Vending location deleted" });
  } catch (error) {
    console.error("Error deleting vending location:", error);
    res.status(500).json({ message: "Error deleting vending location" });
  }
});

module.exports = router;
