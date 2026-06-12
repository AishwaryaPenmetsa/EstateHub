const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  type: {
    type: String,
    required: [true, 'Please add a property type'],
    enum: ['Apartment', 'House', 'Villa', 'Condo', 'Townhouse', 'Land']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', PropertySchema);
