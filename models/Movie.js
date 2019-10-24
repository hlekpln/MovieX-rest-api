const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: [String],
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }], //defining a realtion to another model
  isNominated: { type: Boolean, defoult: false },
  relased: Number
});

// create  movie model from movieSchema and export movie model
module.exports = mongoose.model("Movie", movieSchema);
