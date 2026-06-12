require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);

// Basic route for server check
app.get('/', (req, res) => {
  res.send('EstateHub Backend API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in mode on port ${PORT}`);
});
