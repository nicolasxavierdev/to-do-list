const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const itemModel = mongoose.model('Item', schema);

module.exports = itemModel;