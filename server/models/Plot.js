const { Schema, model } = require('mongoose');

const plotSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  category: [String],
  image: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Plot = model("Plot", plotSchema);

module.exports = Plot;
