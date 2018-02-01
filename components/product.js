"use strict";

let mongoose = require('mongoose');
let ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  categories: [String]
});


mongoose.model('Product', ProductSchema);

module.exports = mongoose.model('Product');
