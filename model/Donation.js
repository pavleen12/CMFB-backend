const mongoose = require('mongoose');
const { Schema } = mongoose;
const IDSequence = require('./IDSequence')



const donationSchema = new Schema({
  donation_type: {
    type: String,
    required: true
  },
  donation_article: {
    type: String,
    required: true,
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
    type: Schema.Types.ObjectId,
    ref: 'user_id',
    required: true
  },
  donation_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  }
});


// donationSchema.pre('save', async function (next) {
//   const doc = this;
  
//     const sequence = await IDSequence.findOneAndUpdate(
//       { name: 'Donations' },
//       { $inc: { value: 1 } },
//       { new: true }
//     ).exec();

//     doc.donation_id = sequence.value;
  
//   next();
// });


//user sollction in db
const Donations = mongoose.model('Donations', donationSchema,'Donations');

module.exports = Donations;