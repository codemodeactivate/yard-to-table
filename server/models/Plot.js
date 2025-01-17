const { Schema, model } = require("mongoose");

const plotSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  zip: {
    type: String,
    // required: true,
  },
  sqft: {
    type: Number,
    // required: true,
  },
  category: {
   type: String,
  //  required: true,
  },
  image :{
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
 
});


const Plot = model("Plot", plotSchema);

module.exports = Plot;
