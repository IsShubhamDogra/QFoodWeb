
const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  image:{
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model("items",itemSchema);