const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
// const connection = mongoose.createConnection('mongodb+srv://piyushsati4:root@cluster0.aqmvp7c.mongodb.net/CMFB?retryWrites=true&w=majority');
const { Schema } = mongoose;

// Initialize auto-increment
// autoIncrement.initialize(connection);

const feedbackSchema = new Schema({
  // i guess only use either name or id
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user_name: {
    type: String,
    required: true,
  },
  feedback_message: {
    type: String,
    required: true
  },
  feedback_date: {
    type: Date,
    required: true
  },
  feedback_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
    // autoIncrement: true,
  }
});

// feedbackSchema.plugin(autoIncrement.plugin, {
//   model: 'Feedback',
//   field: 'feedback_id',
//   startAt: 1, // Specify the starting value for auto-incrementing
//   incrementBy: 1, // Specify the increment value
// });

//user sollction in db
const Feedback = mongoose.model('Feedback', feedbackSchema,'Feedback');

module.exports = Feedback;