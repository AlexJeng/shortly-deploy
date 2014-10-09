var db = require('../config');
var mongoose = require('mongoose');
var Link = mongoose.model('Link', db.Url);
