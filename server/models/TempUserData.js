const { Schema, model } = require("mongoose");

// Define the schema for temporary user data
const tempUserDataSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  step1: {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
  },
  step2: {
    // Define fields for step 2 data if needed
  },
  step3: {
    plotName: String,
    zip: String,
    streetAddress: String,
    lotSquareFootage: Number,
    plotType: String,
    // Add other fields from step 3 as needed
  },
  // Add other steps as needed
}, { timestamps: true }); // Include timestamps for createdAt and updatedAt fields

// Create the TempUserData model
const TempUserData = model("TempUserData", tempUserDataSchema);

module.exports = TempUserData;
