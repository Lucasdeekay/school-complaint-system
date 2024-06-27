// backend/models/Admin.js
const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Admin = model('Admin', adminSchema);

module.exports = Admin;
