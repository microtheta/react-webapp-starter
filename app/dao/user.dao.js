'use strict';

const models = require(global.BASE_PATH+'/models');

var Users = models.Users;
var UserCredentials = models.UserCredentials;

exports.create = function(userObj) {
	return Users.build(userObj).save();
};

exports.saveCredentials = function(user) {
	return UserCredentials.upsert(user);
};

exports.getPassword = function(userid) {
	return UserCredentials.findOne({
		where: {
			userId: userid
		}
	});
};

exports.validateActivationToken = function(token, userid) {
	return UserCredentials.findOne({
		where: {
			activationToken: token,
			userId: userid,
			activationTokenExpired: false
		}
	});
};

exports.validatePasswordResetToken = function(token, userid) {
	return UserCredentials.findOne({
		where: {
			passwordResetToken: token,
			userId: userid,
			passwordResetTokenExpired: false
		}
	});
};


exports.activateAccount = function(userid) {
	var updateUsers = Users.update({
		isEmailVerified:true,
		isActive: true
	},
	{
		where:{
			id:userid
		}
	});

	updateUsers.then(function() {
		UserCredentials.update({
			activationTokenExpired:true
		},
		{
			where:{
				userId:userid
			}
		});
	});

	return updateUsers;

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
