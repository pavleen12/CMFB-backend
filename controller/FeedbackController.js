const express = require("express");
const FeedBack = require("../model/FeedBack");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Feedback CRUD operations
router.post("/feedBack",
  [
    body('user_id').notEmpty().withMessage('User ID must be a number.'),
    body('user_name').notEmpty().withMessage('User name is required.'),
    body('feedback_message').notEmpty().withMessage('Feedback message is required.'),
    body('feedback_date').isISO8601().withMessage('Invalid date format.'),
  ], async (req, res) => {
  
  try {

  
    const newFeedback = await FeedBack.create({
      feedback_message: req.body.feedback_message,
      feedback_date: req.body.feedback_date,
      user_name: req.body.user_name,
      user_id: req.body.user_id,
    });;

    res.status(201).json({ message: "Feedback made successfully" });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
});

router.get("/getAllFeedBacks", async (req, res) => {
try {
  const fetchedFeedBack = await FeedBack.find({});
  res.json(fetchedFeedBack); 
} catch (error) {
  res.status(500).json({ message: "Error fetching feedback" });
}
});


// Route to fetch a single feedback by ID
router.get('/feedback/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid feedback ID' });
  }
  
  const getFeedback = await FeedBack.findById(req.params.id);
  if (!getFeedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }
  res.json(getFeedback);
} catch (error) {
  console.error('Error fetching feedback:', error);
  res.status(500).json({ message: 'Error fetching feedback' });
}
});


// Route to update a feedback
router.put('/feedback/:id',
[
  body('user_id').notEmpty().withMessage('User ID must be a number.'),
  body('user_name').notEmpty().withMessage('User name is required.'),
  body('feedback_message').notEmpty().withMessage('Feedback message is required.'),
  body('feedback_date').isISO8601().withMessage('Invalid date format.'),
], async (req, res) => {
try {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.params)
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid feedback ID' });
  }

  const updatedFeedback = await FeedBack.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedFeedback) {
    return res.status(404).json({ message: 'FeedBack not found' });
  }

  res.json(updatedFeedback);
} catch (error) {
  console.error('Error updating feedback:', error);
  res.status(500).json({ message: 'Error updating feedback' });
}
});

// Route to delete a feedback
router.delete('/:id', async (req, res) => {
try {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid feedback ID' });
  }

  const deletedFeedback = await FeedBack.findByIdAndDelete(req.params.id);
  if (!deletedFeedback) {
    return res.status(404).json({ message: 'No such Feedback' });
  }
  res.json({ message: 'Feedback deleted successfully' });
} catch (error) {
  console.error('Error deleting feedback:', error);
  res.status(500).json({ message: 'Error deleting feedback' });
}
});

module.exports = router;