import mongoose from 'mongoose';

const AirQualityRecordSchema = new mongoose.Schema(
  {
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
  },
  { collection: 'air_quality_records' },
);

module.exports = mongoose.model('AirQualityRecord', AirQualityRecordSchema);
