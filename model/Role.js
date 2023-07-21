const mongoose = require('mongoose');
const { Schema } = mongoose;


const roleSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
    auto:true
  },
  roleType: {
    type: String,
    required: true
  }
});



const Role = mongoose.model('Role', roleSchema);

module.exports = Role;