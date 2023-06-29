import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  batchNumber: Number,
  name: String,
  farmName: String,
  farmOriginLocation: String,
  destination: String,
  isCertified: Boolean,
  storageSensorData: [],
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);

