const express = require("express");
const Donations = require("../model/Donation");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Redis = require('../redis_func');
const { json } = require("body-parser");
const redisInstance = new Redis();


router.post("/donate",
[
  body('donation_type').notEmpty().withMessage('Donation type is required.'),
  body('donation_article').notEmpty().withMessage('Donation article is required.'),
  body('donation_amount').isNumeric().withMessage('Donation amount must be a number.'),
  body('donation_datetime').isISO8601().withMessage('Invalid date format.'),
  body('user_id').isNumeric().withMessage('User ID must be a number.'),
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error in bopdy")
    return res.status(400).json({ errors: errors.array() });
  }
  
    try {
    
      const newDonation = await Donations.create({
        donation_type: req.body.donation_type,
        donation_article: req.body.donation_article,
        donation_amount: req.body.donation_amount,
        donation_datetime: req.body.donation_datetime,
        user_id: req.body.user_id,
      });
  
      console.log(newDonation)

      res.status(201).json({ message: "Donation made successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getAllDonations", async (req, res) => {
  try {
    redisInstance.getRedisData('getAllDonations').then(data => {
    console.log("entered get metho and got somethingr" , data)
      if (data.result) {
        console.log('Data found in Redis:', data);
        console.log( data.result)
        console.log( JSON.parse(JSON.stringify(data)));
        console.log( JSON.parse(data));

        return res.json(data)
      } else {
        console.log("entered here")
        // If data is not found in Redis, fetch it from the database and return it
        Donations.find({}).then(databaseData => {
          // Store the data in Redis cache for future use (optional)
            redisInstance.setRedisData('foo', 'bar')
            redisInstance.setRedisData('/getAllDonations', JSON.stringify(databaseData));
            console.log('Data fetched from the database:', typeof databaseData);
            return res.json(databaseData);  // Return the donations as a JSON response
          })
        }
      });
   
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations" });
  }
});


// Route to fetch a single donation by ID
router.get('/donations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid donation ID' });
    }
    
    fetch("https://usw2-sacred-caribou-30494.upstash.io/get/donations/:id", {
      headers: {
        Authorization: "Bearer AnceACQgZmM2NmEyZTctMGI3ZS00YWQ2LTk3ZjYtYmI5NjJlYzRkN2EwqlhHQr1j6hOcXxOrSp6RA1s5XfXy7m71JxCnSKaL2Bo="
      }
    }).then(response => response.json())
      .then(data => console.log(data));

        // If data doesn't exist in the cache, query the database
        // After fetching the data from the database, store it in the cache
        
        const donation = await Donations.findById(req.params.id);
       

        if (!donation) {
          return res.status(404).json({ message: 'Donation not found' });
        }
        res.json({ source: 'api', donation });
      
    
    
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Error fetching donation' });
  }
});


// Route to update a donation
router.put('/donations/:id', async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.params)
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid donation ID' });
    }

    const updatedDonation = await Donations.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json(updatedDonation);
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Error updating donation' });
  }
});

// Route to delete a donation
router.delete('/donations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid donation ID' });
    }

    const deletedDonation = await Donations.findByIdAndDelete(req.params.id);
    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});


module.exports = router;