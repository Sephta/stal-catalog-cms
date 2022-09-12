const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please provide a text value...']
    },
    items: {
      type: mongoose.Schema.Types.Array,
      requried: [true, 'Please provide at least an empty array']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SubCategory', subCategorySchema)