var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.connect('mongodb://MongoLab-q:HURes0lUt4xw8fYrWe_ZjPjccyeiSV.CPpe4YsoNz3A-@ds041157.mongolab.com:41157/MongoLab-q');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Database Created Successfully');
});

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  id: ObjectId,
  username: String,
  password: String
});

var urlSchema = new Schema({
  id: ObjectId,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  timeStamps: {type: Date, default: Date.now}
});

/* ******************* EXPORTS ******************* */
exports.userSchema = userSchema;
exports.urlSchema = urlSchema



