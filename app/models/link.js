var crypto = require('crypto');
var mongoose = require('mongoose');
var urlSchema = require('../config').urlSchema;

urlSchema.pre('save', true, function(next, done) {
  var model = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(model.get('url'));
  model.set('code', shasum.digest('hex').slice(0, 5));
  next();
  done();
});

exports.Url = mongoose.model('Link', urlSchema);
