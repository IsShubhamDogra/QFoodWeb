const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    pay_id:String,
    name:String,
    phone:Number,
    amount:Number,
  }
);

module.exports = mongoose.model("bills",billSchema);