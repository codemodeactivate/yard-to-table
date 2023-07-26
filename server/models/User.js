const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const gardenerProfileSchema = new mongoose.Schema({
  experience: Number,
  areasServed: [String],
  specialties: [String],
  rating: Number,
  // more fields as needed...
});

const homeownerProfileSchema = new mongoose.Schema({
  gardenType: String,
  plots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }],
  // more fields as needed...
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isGardener: {
    type: Boolean,
    required: true,
    default: false
  },
  isHomeowner: {
    type: Boolean,
    required: true,
    default: false
  },
  gardenerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GardenerProfile',
  },
  homeownerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HomeownerProfile',
  },
  // more fields as needed...
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
const GardenerProfile = mongoose.model('GardenerProfile', gardenerProfileSchema);
const HomeownerProfile = mongoose.model('HomeownerProfile', homeownerProfileSchema);

module.exports = {
  User,
  GardenerProfile,
  HomeownerProfile,
};
