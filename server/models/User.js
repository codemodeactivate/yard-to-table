const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    isGardener: {
        type: Boolean,
        default: false,
    },
    isHomeowner: {
        type: Boolean,
        default: false,
    },
    gardenerProfile: {
        type: Schema.Types.ObjectId,
        ref: "GardenerProfile",
    },
    homeownerProfile: {
        type: Schema.Types.ObjectId,
        ref: "HomeownerProfile",
    },
});

const User = model("User", userSchema);

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const gardenerSchema = new mongoose.Schema({
  experience: Number,
  areasServed: [String],
  specialties: [String],
  rating: Number,
  // more fields as needed...
});

const homeownerSchema = new mongoose.Schema({
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
  gardenerProfile: gardenerSchema,
  homeownerProfile: homeownerSchema,
  // more fields as needed...
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
