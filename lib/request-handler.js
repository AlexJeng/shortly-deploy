var request = require('request');
var util = require('../lib/utility');
var MongoUser = require('../app/models/user').User;
var MongoLink = require('../app/models/link').Url;

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  MongoLink.find({}, function(err, docs) {
    res.send(200, docs);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  MongoLink.find({url: uri}, function(error, link) {
    if (error) { throw error; }
    if (link.length) {
      res.send(200, link);
      return;
    }
    util.getUrlTitle(uri, function(error, title) {
      if (error) {
        return res.send(404);
      }
      new MongoLink({
        url: uri,
        title: title,
        base_url: req.headers.origin
      }).save(function(err, urlPage) {
        res.send(200, urlPage);
      });
    });
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  MongoUser.find({username: username}, function(error, user) {
    if (error) { throw error; }
    if (!user.length) {
      res.redirect('/login');
      return;
    }
    user[0].comparePassword(password, function(match) {
      if (match) {
        util.createSession(req, res, user);
      } else {
        res.redirect('/login');
      }
    });
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  MongoUser.find({username: username}, function(error, user) {
    if (error) { throw error; }
    if (user.length) {
      res.redirect('/login');
    }
    new MongoUser({
      username: username,
      password:password
    }).save(function(err, usr) {
      if (err) { throw err; }
      util.createSession(req, res, user);
    });
  });
};

exports.navToLink = function(req, res) {
  MongoLink.find({code:req.params[0]}, function(err, docs) {
    if (err) { throw error; }
    if (docs.length === 0) {
      res.redirect('/');
    } else {
      var link = docs[0];
      var current = link.get('visits');
      link.set('visits', current + 1);
      link.save(function(err, link) {
        return res.redirect(link.get('url'));
      });
    }
  });
};
