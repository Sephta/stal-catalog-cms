const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please provide a text value...']
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please provide a text value...']
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please provide a text value...']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)