const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Include the player routes
const playerRoutes = require("./routes/players");
app.use("/api/players", playerRoutes);

// MongoDB connection (cleaned up)
mongoose.connect('mongodb+srv://paxiong25:Davidonly24@cluster6210.bwdtj.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
