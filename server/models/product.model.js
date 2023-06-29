import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  batchNumber: Number,
  name: String,
  farmName: String,
  farmOriginLocation: String,
  destination: String,
  isCertified: Boolean,
  storageSensorData: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

// exclude __v key and rename _id to id
productSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Product = mongoose.model('Product', productSchema);

