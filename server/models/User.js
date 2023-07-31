const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const gardenerProfileSchema = new Schema({
  experience: Number,
  areasServed: [String],
  specialties: [String],
  rating: Number,
  // more fields as needed...
});

const homeownerProfileSchema = new Schema({
  gardenType: String,
  // more fields as needed...
});

const plotSchema = new Schema({
  name: String,
  size: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
  // more fields as needed...
});

const profileSchema = new Schema({
  step1: {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
  },
  step3: {
    plotName: String,
    zip: String,
    streetAddress: String,
    lotSquareFootage: Number,
    plotType: String,
    // Add other fields from step 3 as needed
  },
  isCompleted: Boolean,
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
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
  profile: profileSchema, // Store the step 1 and step 3 information in the profile field
  gardenerProfile: {
    type: Schema.Types.ObjectId,
    ref: 'GardenerProfile',
  },
  homeownerProfile: {
    type: Schema.Types.ObjectId,
    ref: 'HomeownerProfile',
  },
  plots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plot'
    }
  ]
  // more fields as needed...
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model('User', userSchema);
const GardenerProfile = model('GardenerProfile', gardenerProfileSchema);
const HomeownerProfile = model('HomeownerProfile', homeownerProfileSchema);
// const Plot = model('Plot', plotSchema);

module.exports = {
  User,
  GardenerProfile,
  HomeownerProfile,
  // Plot
};
