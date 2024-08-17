const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    max: 50,
  },
  likedMovies: Array,
});

module.exports = mongoose.model("user", userSchema);
