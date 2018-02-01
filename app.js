"use strict";

let express = require('express');
let app = express();
let db = require('./db');

let Controller = require('./components/controller');
app.use('/api', Controller);

module.exports = app;
