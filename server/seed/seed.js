require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Property = require('../models/Property');
const connectDB = require('../config/db');

const sampleProperties = [
  {
    title: 'Modern Minimalist Apartment',
    location: 'Downtown Manhattan, New York',
    price: 850000,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'A sleek, open-concept 2-bedroom apartment in the heart of NYC. Features floor-to-ceiling windows, premium appliances, and a stunning skyline view. Close to cafes, parks, and subway stations.'
  },
  {
    title: 'Luxury Oceanside Villa',
    location: 'Malibu Coast, California',
    price: 3200000,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'An architectural masterpiece featuring 5 bedrooms, an infinity pool, and direct private beach access. Immerse yourself in panoramic ocean views, expansive outdoor living decks, and state-of-the-art automation.'
  },
  {
    title: 'Cozy Suburban Family House',
    location: 'Oakridge Suburban, Austin',
    price: 540000,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    description: 'Charming 3-bedroom, 2-bathroom family home situated in a quiet, tree-lined cul-de-sac. Features a spacious landscaped backyard, modern kitchen layout, and a top-tier local school district.'
  },
  {
    title: 'Chic Industrial Loft Condo',
    location: 'SOMA District, San Francisco',
    price: 920000,
    type: 'Condo',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    description: 'A converted loft condo showcasing exposed brick walls, timber posts, and soaring industrial ceilings. Includes custom spiral stairs to a mezzanine bedroom and a common rooftop terrace with bridge views.'
  },
  {
    title: 'Elegant Traditional Townhouse',
    location: 'Back Bay, Boston',
    price: 1650000,
    type: 'Townhouse',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
    description: 'Meticulously preserved historical Victorian brownstone townhouse. Built with rich woodwork, multiple fireplaces, updated gourmet kitchen, and a private brick-paved courtyard.'
  },
  {
    title: 'Spacious Scenic Hilltop Plot',
    location: 'Hill Country, Austin',
    price: 350000,
    type: 'Land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'A stunning 2-acre plot of prime elevated land, ready for custom building. Offers unmatched sunset vistas and rolling green hill panoramas while staying within a 20-minute drive of city life.'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('Clearing existing properties...');
    await Property.deleteMany();
    console.log('Existing properties cleared.');

    // Insert new data
    console.log('Seeding database with sample properties...');
    await Property.insertMany(sampleProperties);
    console.log('Database seeded successfully!');

    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
