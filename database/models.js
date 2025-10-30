import mongoose from 'mongoose';

// Profile Schema
const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String, default: '' },
  profile_pic: { type: String, default: '' },
  wallet_balance: { type: Number, default: 0, min: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Image Schema
const imageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  creator_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image_url: { type: String, required: true },
  thumbnail_url: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  downloads: { type: Number, default: 0, min: 0 },
  category: { type: String, default: 'general' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  buyer_id: { type: String, required: true },
  creator_id: { type: String, required: true },
  image_id: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  stripe_payment_id: { type: String },
  created_at: { type: Date, default: Date.now }
});

// Download Token Schema
const downloadTokenSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  transaction_id: { type: String, required: true },
  buyer_id: { type: String, required: true },
  image_id: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires_at: { type: Date, required: true },
  used: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// Create models
const Profile = mongoose.model('Profile', profileSchema);
const Image = mongoose.model('Image', imageSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const DownloadToken = mongoose.model('DownloadToken', downloadTokenSchema);

export {
  Profile,
  Image,
  Transaction,
  DownloadToken
};
