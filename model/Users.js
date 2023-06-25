const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  role_id: {
    type: Number,
    ref: 'role_id',
    required: true
  },
  user_id: {
    type: Number,
    ref: 'role_id',
    required: true
  }
});

//user sollction in db
const Users = mongoose.model('Users', userSchema,'Users');

module.exports = Users;