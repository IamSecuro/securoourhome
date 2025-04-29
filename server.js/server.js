// server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/myDatabase';  // Replace 'myDatabase' with your database name

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Create a Mongoose model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

// Route to get all users
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to create a new user
app.post('/users', (req, res) => {
  const newUser = new User(req.body);  // The data will come from the request body
  newUser.save()
    .then(() => res.status(201).json(newUser))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
