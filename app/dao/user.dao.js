'use strict';

const models = require(BASE_PATH+"/models");


var User = models.User;

exports.create = function(userObj) {
  return User.build(userObj).save();
};

exports.findById = function(id) {
  return User.findOne({
    where: {
      id: id
    }
  });
};

exports.findByEmail = function(email) {
  return User.findOne({
    where: {
      email: email
    }
  });
};

exports.findAll = function() {
  return User.findAll();
};
