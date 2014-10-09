var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

mongoose.connect('mongodb://localhost/rickalex');

mongoose.on('error', console.error.bind(console, 'connection error:'));
mongoose.once('open', function callback () {
  // yay!
});

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = new Schmea({
  id: ObjectId,
  username: String,
  password: String
});

var Url = new Schema({
  id: ObjectId,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  timeStamps: {type: Date, default: Date.now}
});

/* *******************METHODS ********************/

User.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

User.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};





exports.User = User;
exports.Url = Url;
