// Import required libraries
import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// MongoDB URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/uVideo-db';
// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB', MONGODB_URI);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
