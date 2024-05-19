// Import required libraries
const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/vidSphere-db';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
