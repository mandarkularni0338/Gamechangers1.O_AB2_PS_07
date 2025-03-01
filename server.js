const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blood_donation', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ' + err));

// Define a schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like CSS, JS, images)

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });
  
  newContact.save()
    .then(() => res.json({ message: 'Thank you for contacting us! We will respond shortly.' }))
    .catch((err) => res.status(500).json({ message: 'Error saving your contact information.' }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
