const express = require("express");
const Inventory = require("../model/Inventory");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// InventoryManagement CRUD operations
router.post('/addInventory', async (req, res) => {
    try {
      const newInventoryManagement = await Inventory.create(req.body);
      res.status(201).json(newInventoryManagement);
    } catch (error) {
      res.status(500).json({ message: 'Error creating inventory management' });
    }
  });
  
  router.get('/inventory-managements', async (req, res) => {
    try {
      const inventoryManagements = await Inventory.find();
      res.json(inventoryManagements);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching inventory managements' });
    }
  });

  router.post("/inventory", async (req, res) => {
  
    try {
  
    
      const newInventory = await Inventory.create({
        details: req.body.details,
      });;
  
      res.status(201).json({ message: "Inventory item details created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  });
  
  router.get("/getAllInventory", async (req, res) => {
  try {
    const fetchedInventory = await Inventory.find({});
    res.json(fetchedInventory); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching FoodBanks" });
  }
  });
  
  
  
  router.get('/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Inventory item details ID' });
    }
    
    const getInventory = await Inventory.findById(req.params.id);
    if (!getInventory) {
      return res.status(404).json({ message: 'FoodBanks not found' });
    }
    res.json(getInventory);
  } catch (error) {
    console.error('Error fetching Inventory item details:', error);
    res.status(500).json({ message: 'Error fetching Inventory item details' });
  }
  });
  
  
  // Route to update a Inventory item details
  router.put('/inventory/:id', async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    console.log(req.params)
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Inventory item details ID' });
    }
  
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
  
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item details not found' });
    }
  
    res.json(updatedInventory);
  } catch (error) {
    console.error('Error updating Inventory item details:', error);
    res.status(500).json({ message: 'Error updating Inventory item details' });
  }
  });
  
  // Route to delete a Inventory
  router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Inventory item details ID' });
    }
  
    const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedInventory) {
      return res.status(404).json({ message: 'No such FoodBanks' });
    }
    res.json({ message: 'Inventory item details deleted successfully' });
  } catch (error) {
    console.error('Error deleting Inventory item details:', error);
    res.status(500).json({ message: 'Error deleting Inventory item details' });
  }
  });

module.exports = router;