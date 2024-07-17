const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Dinesh:Dineshk123@cluster0.zzhdnr8.mongodb.net/').then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Define a schema
const ChannelSchema = new mongoose.Schema({
  channelName: String,
  link: String,
  description: String,
  profile: String
});

// Define a model
const Channel = mongoose.model('Channel', ChannelSchema);

// POST endpoint to add multiple channels
app.post('/channels', async (req, res) => {
  try {
    const channels = req.body;
    await Channel.insertMany(channels);
    res.status(201).send('Channels added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET endpoint to retrieve all channels
app.get('/channels', async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
