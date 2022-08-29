const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a text value...']
    },
    email: {
      type: String,
      required: [true, 'Please provide a text value...']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)
