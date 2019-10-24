const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthdate: Date,
  hasOscar: { type: Boolean, default: false },
  gender: { type: String, enum: ["female", "male"] } // enum properties can only have  the specified values with the  specified data type
});

// create  actor model from actorSchema and export actor model
module.exports = mongoose.model("Actor", actorSchema);
