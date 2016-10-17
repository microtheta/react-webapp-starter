'use strict';

const models = require(global.BASE_PATH+'/models');

var Users = models.Users;
var UserPass = models.UserPassword;

exports.create = function(userObj) {
	return Users.build(userObj).save();
};

exports.savePassword = function(user) {
	return UserPass.build(user).save();
};

exports.getPassword = function(userid) {
	return UserPass.findOne({
		where: {
			userId: userid
		}
	});
};

exports.findById = function(id) {
	return Users.findOne({
		where: {
			id: id
		}
	});
};

exports.findByEmail = function(email) {
	return Users.findOne({
		where: {
			email: email
		}
	});
};

exports.findAll = function() {
	return Users.findAll();
};
