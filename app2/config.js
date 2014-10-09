var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


mongoose.connect('mongodb://localhost/rickAlexPeter');
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

exports.User = mongoose.model('User', userSchema);
exports.Url = mongoose.model('Url', urlSchema);
exports.db = db;


/* *******************METHODS ********************/

// User.methods.comparePassword = function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//     callback(isMatch);
//   });
// };

// User.methods.hashPassword = function() {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.get('password'), null, null).bind(this)
//     .then(function(hash) {
//       this.set('password', hash);
//     });
// };


