const { Schema, model } = require("mongoose");

const plotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  category: {
   type: String,
   required: true,
  }
 
});

const Plot = model("Plot", plotSchema);

module.exports = Plot;
