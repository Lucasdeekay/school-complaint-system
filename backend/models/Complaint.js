// backend/models/Complaint.js
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
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

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
