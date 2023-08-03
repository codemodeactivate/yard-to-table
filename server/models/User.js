const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const gardenerProfileSchema = new Schema({
  yearsExperience: Number,
  areaServed: [String],
  specialty: [String],
  rating: Number,
  cost: Number,
  bio: String,
  photo: String,
  // other fields as needed
});

const homeownerProfileSchema = new Schema({
  //a user is a person that hs a plot but since the plot can be
  //many and inside of a plot there's many things
  //this is the object that is part of the homeowner
  //that is part of the user
  plots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plot'
    }
  ]
  // more fields as needed...
});

// Removing this as I moved it to the Plot.js model - MT
// const plotSchema = new Schema({
//   name: String,
//   size: String,
//   userId: { type: Schema.Types.ObjectId, ref: 'User' }
//   // more fields as needed...
// });

// const profileSchema = new Schema({
//   step1: {
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String,
//     confirmPassword: String,
//   },
//   step3: {
//     plotName: String,
//     zip: String,
//     streetAddress: String,
//     lotSquareFootage: Number,
//     plotType: String,
//     // Add other fields from step 3 as needed
//   },
//   isCompleted: Boolean,
// });

const userSchema = new Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    sparse: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    // required: true
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
    // required: true,
    default: false
  },
  isHomeowner: {
    type: Boolean,
    // required: true,
    default: false
  },
  // profile: profileSchema, // Store the step 1 and step 3 information in the profile field
  gardenerProfile: {
    type: Schema.Types.ObjectId,
    ref: 'GardenerProfile',
  },
  homeownerProfile: {
    type: Schema.Types.ObjectId,
    ref: 'HomeownerProfile',
  }
  // plots: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Plot'
  //   }
  // ]
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
// Removing this as I moved it to the Plot.js model - MT
// const Plot = model('Plot', plotSchema);


module.exports = {
  User,
  GardenerProfile,
  HomeownerProfile,
};
