const express = require("express");
const FoodBanks = require("../model/FoodBank");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post("/foodbank",
[
  body('details').notEmpty().withMessage('Deatils is required.'),
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error in bopdy")
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const newFoodBank = await FoodBanks.create({
      details: req.body.details,
    });;

    res.status(201).json({ message: "FoodBank created successfully" });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
});

router.get("/getAllFoodBanks", async (req, res) => {
try {
  const fetchedFoodBanks = await FoodBanks.find({});
  res.json(fetchedFoodBanks); 
} catch (error) {
  res.status(500).json({ message: "Error fetching FoodBanks" });
}
});

router.get('/foodbank/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid foodbank ID' });
  }
  
  const getFoodBank = await FoodBanks.findById(req.params.id);
  if (!getFoodBank) {
    return res.status(404).json({ message: 'FoodBanks not found' });
  }
  res.json(getFoodBank);
} catch (error) {
  console.error('Error fetching foodbanks:', error);
  res.status(500).json({ message: 'Error fetching foodbanks' });
}
});

// Route to update a foodbanks
router.put('/foodBank/:id', async (req, res) => {
try {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.params)
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Foodbank ID' });
  }

  const updatedFoodBank = await FoodBanks.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedFoodBank) {
    return res.status(404).json({ message: 'FoodBanks not found' });
  }

  res.json(updatedFoodBank);
} catch (error) {
  console.error('Error updating FoodBanks:', error);
  res.status(500).json({ message: 'Error updating FoodBanks' });
}
});

// Route to delete a FoodBanks
router.delete('/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid FoodBanks ID' });
  }

  const deletedFoodBanks = await FoodBanks.findByIdAndDelete(req.params.id);
  if (!deletedFoodBanks) {
    return res.status(404).json({ message: 'No such FoodBanks' });
  }
  res.json({ message: 'FoodBanks deleted successfully' });
} catch (error) {
  console.error('Error deleting FoodBanks:', error);
  res.status(500).json({ message: 'Error deleting FoodBanks' });
}
});

module.exports = router;