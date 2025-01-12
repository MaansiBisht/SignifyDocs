const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  agreement: {
    type: Boolean,
    required: true
  },
  premiumsignature: {
    type: String,
    required: true // Ensure this field is required
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true // Add createdAt and updatedAt fields
});

module.exports = mongoose.model("Form", formSchema);