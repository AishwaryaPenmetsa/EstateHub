const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// @route   GET /api/properties
// @desc    Get all properties
// @access  Public
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err.message);
    res.status(500).json({ message: 'Server error, could not fetch properties' });
  }
});

// @route   POST /api/properties
// @desc    Add new property
// @access  Public (No auth for demo/internship scope)
router.post('/', async (req, res) => {
  try {
    const { title, location, price, type, image, description } = req.body;
    
    // Simple validation
    if (!title || !location || !price || !type || !image || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProperty = new Property({
      title,
      location,
      price: Number(price),
      type,
      image,
      description
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error('Error adding property:', err.message);
    res.status(500).json({ message: 'Server error, could not add property' });
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete a property listing
// @access  Public (No auth for demo/internship scope)
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.id || req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting property:', err.message);
    res.status(500).json({ message: 'Server error, could not delete property' });
  }
});

module.exports = router;
