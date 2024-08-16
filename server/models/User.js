const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false // This will prevent Mongoose from including the `__v` field.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
