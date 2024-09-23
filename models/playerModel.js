const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { 
	type: String, 
	required: true },

  position: { 
	type: String, 
	required: true },

  number: { 
	type: String, 
	required: true },

  age: { 
	type: String, 
	required: true },

  weight: { type: String, required: true }
});

module.exports = mongoose.model('Player', playerSchema);

