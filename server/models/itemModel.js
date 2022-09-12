const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please provide a text value...']
    },
    img: {
      type: mongoose.Schema.Types.String,
      requried: [true, 'Please provide at least an empty string']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema)