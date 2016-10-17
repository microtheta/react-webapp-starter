'use strict';

const auth = require('./auth');
const user = require(global.BASE_PATH + '/app/dao/user.dao');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postLogin = function(req, res, next) {

	let validatorSchema = {
		'email': {
			isEmail: {
				errorMessage: 'Invalid Email'
			}
		},
		'password': {
			notEmpty: true,
			errorMessage: 'Password Required'
		}
	};

	req.checkBody(validatorSchema);
	let errors = req.validationErrors();
	if (errors) {
		return res.status(400).render(req.url, {loginerrors: errors});
	}
	

	auth.localAuthenticate(req, res, next, function(err, user, info) {
		if (err) { return next(err); }
		
		if (!user) {
			return res.status(400).render(req.url, {loginerrors: [info]});
		}

		req.logIn(user, function(err) {
			if (err) { return next(err); }
			res.redirect(req.session.returnTo || '/');
		});
	});
	
};

exports.postSignup = function(req, res, next) {

	let userValidatorSchema = {
		'firstName': {
			notEmpty: true,
			errorMessage: 'First Name Required'
		},
		'lastName': {
			notEmpty: true,
			errorMessage: 'Last Name Required'
		},
		'email': {
			isEmail: {
				errorMessage: 'Invalid Email'
			}
		},
		'password': {
			notEmpty: true,
			errorMessage: 'Password Required'
		},
		'confirmpassword': {
			notEmpty: true,
			errorMessage: 'Confirm Password Required'
		}
	};

	// Validate user request
	req.checkBody(userValidatorSchema);
	let errors = req.validationErrors();
	if (errors) {
		res.status(400).render(req.url, {signuperrors: errors});
		return;
	}
	if (req.body.password !== req.body.confirmpassword) {
		res.status(400).render(req.url, {signuperrors: [{'param':'password', 'msg': 'Password and Confirm password is not matching'}] });
		return;
	}
	var userObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	};

	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

		user.create(userObj).then(function (newUser) {
			var passwordObj = {
				userId: newUser.id,
				password: hash
			}
			user.savePassword(passwordObj).then(function(){
				/* TODO Send activation Mail */
				res.render(req.url, {email: newUser.email});
			});

			/*req.logIn(user, function() {
				res.redirect(req.session.returnTo || '/');
			});*/

		});

	});

};

exports.logout = function(req, res) {
	auth.logOut(req, res, function() {
		res.redirect('/');
	});
};

exports.getUser = function(req, res) {
	user.findAll().then(function (data) {
		res.send(data);
	});
};