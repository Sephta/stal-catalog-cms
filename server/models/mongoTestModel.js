const mongoose = require('mongoose');

const mongoTestSchema = mongoose.Schema(
  {
    test: {
      type: String,
      required: [true, 'Please provide a text value...']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MongoTest', mongoTestSchema)
