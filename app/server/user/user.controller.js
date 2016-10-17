'use strict';

const auth = require('./auth');
const user = require(global.BASE_PATH + '/app/dao/user.dao');

exports.postLogin = function(req, res, next) {

	if (req.body.email && req.body.password) {
		auth.localAuthenticate(req, res, next, function(err, user, info) {
			if (err) { return next(err); }
			
			if (!user) {
				return res.status(400).render(req.url, {loginerrors: info});
			}

			req.logIn(user, function(err) {
				if (err) { return next(err); }
				res.redirect(req.session.returnTo || '/');
			});
		});
	}
	else {
		return res.redirect('/login');
	}
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

	user.create(req.body).then(function (user) {
		req.logIn(user, function() {
			res.redirect(req.session.returnTo || '/');
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