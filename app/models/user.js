var userSchema = require('../config').userSchema;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

userSchema.method('comparePassword', function(attemptedPassword, callback) {
  var model = this;
  bcrypt.compare(attemptedPassword, model.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
});

userSchema.method('hashPassword', function(next, done) {
  var model = this;
  var password = model.get('password');
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      throw new Error('Error from bcryptSalt:', err.message);
    }
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        throw new Error('Error from bcryptHash:', err.message);
      }
      model.set('password', hash);
      next();
      done();
    });
  });
});

userSchema.pre('save', true, function(next, done) {
  this.hashPassword(next, done);
});

exports.User = mongoose.model('User', userSchema);
