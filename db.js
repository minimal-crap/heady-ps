"use strict";
let mongoose = require('mongoose');
let dbURI = process.env.MONGODB_URL || 'mongodb://localhost/heady-ps';

mongoose.connect(dbURI);
