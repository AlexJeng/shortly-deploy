var db = require('../config');
var mongoose = require('mongoose');
var User = mongoose.model('User', db.User);
