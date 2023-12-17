const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
