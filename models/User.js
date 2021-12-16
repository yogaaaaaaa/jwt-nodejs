const mongoose = require("mognoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  las_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
