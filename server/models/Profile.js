const { Schema, model } = require("mongoose");

// Define the schema for the Profile model
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true, // To enforce one-to-one relationship with User model
    required: true,
  },
  step1: {
    // Define the fields for step1
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
  },
  step3: {
    // Define the fields for step3
    plotName: String,
    zip: String,
    streetAddress: String,
    lotSquareFootage: Number,
    plotType: String,
    // Add other fields from step 3 as needed
  },
  // Add other steps as needed
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Create the Profile model using the schema
const Profile = model("Profile", profileSchema);

// Export the Profile model
module.exports = Profile;
