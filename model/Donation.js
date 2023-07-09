const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationSchema = new Schema({
  donation_type: {
    type: String,
    required: true
  },
  donation_article: {
    type: String,
    required: true,
    unique: true
  },
  donation_amount: {
    type: Number,
    required: true
  },
  donation_datetime: {
    type: Date,
    required: true
  },
  user_id: {
    type: Number,
    ref: 'user_id',
    required: true
  },
  donation_id: {
    type: Number,
    ref: 'donation_id',
    required: true
  }
});

//user sollction in db
const Donations = mongoose.model('Donations', donationSchema,'Donations');

module.exports = Donations;