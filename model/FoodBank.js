const mongoose = require('mongoose');
const { Schema } = mongoose;



const foodBankSchema = new Schema({
  details: {
    type: String,
    required: true
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  }
});



//user sollction in db
const FoodBanks = mongoose.model('FoodBanks', foodBankSchema,'FoodBanks');

module.exports = FoodBanks;