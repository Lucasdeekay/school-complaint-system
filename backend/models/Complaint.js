// backend/models/Complaint.js
const { Schema, model } = require('mongoose');

const complaintSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  suggestion: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  category: {
    type: String,
    enum: [
      'Issues of examination-related matters', 
      'Lecture Hall matters', 
      'Lecturer-related feedback', 
      'Hostel issues', 
      'Cafeteria concerns', 
      'Miscellaneous concerns'
    ],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'in-review'],
    default: 'open'
  }
}, { timestamps: true });

const Complaint = model('Complaint', complaintSchema);

module.exports = Complaint;
