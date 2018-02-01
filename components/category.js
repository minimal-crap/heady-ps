"use strict";

let mongoose = require('mongoose');
let CategorySchema = new mongoose.Schema({
  name: String,
  child_categories: [String]
});

mongoose.model('Category', CategorySchema);

module.exports = mongoose.model('Category');
