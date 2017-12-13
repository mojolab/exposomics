import mongoose from 'mongoose';

const AqiSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: false,
  },
  county: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: String,
    required: true,
    unique: false,
  },
  AQI: {
    type: Number,
    required: true,
    unique: false,
  },
  Category: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('AQI', AqiSchema);
