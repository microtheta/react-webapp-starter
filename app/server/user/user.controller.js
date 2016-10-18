'use strict';

const auth = require('./auth');
const user = require(global.BASE_PATH + '/app/dao/user.dao');
const mailHelper = require(global.BASE_PATH + '/app/server/utils/mailhelper');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
			
			var errObj = { loginerrors: [info] };

			if(info.notverified) {
				errObj = { notverified: true };
			}
			if(info.inactive) {
				errObj = { inactive: true };
			}

			return res.status(400).render(req.url, errObj);
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
		res.status(400).render(req.url, {signuperrors: errors, reqBody: req.body});
		return;
	}
	if (req.body.password !== req.body.confirmpassword) {
		res.status(400).render(req.url, {reqBody: req.body, signuperrors: [{'param':'password', 'msg': 'Password and Confirm password is not matching'}] });
		return;
	}
	var userObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	};

	user.findByEmail(userObj.email).then(function (existingUser) {

		if(!existingUser) {

			bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

				user.create(userObj).then(function (newUser) {

					crypto.randomBytes(16, (err, buf) => {

						const token = buf.toString('hex');
						

						var credentialsObj = {
							userId: newUser.id,
							password: hash,
							activationToken: token
						};

						user.saveCredentials(credentialsObj).then(function() {
							userObj.emailVerificationLink = req.protocol + "://" + req.get('host')+'/user/account/'+newUser.id+'/activate?token=' + token;
							mailHelper.sendHtmlMail('usersignup', userObj, 'Welcome To Microtheta! Confirm Your Email', newUser.email);
							res.render(req.url, {email: newUser.email});
						});
					});

					/*req.logIn(user, function() {
						res.redirect(req.session.returnTo || '/');
					});*/

				});

			});

		}
		else {
			res.status(400).render(req.url, {reqBody: req.body, existingUser: true});
		}

	});

};

exports.activateAccount = function (req, res, next) {
	if(req.params.userId && req.query.token) {
		user.validateActivationToken(req.query.token, req.params.userId).then(function(credentialsObj) {
			if(credentialsObj) {

				user.activateAccount(credentialsObj.userId).then(function(affectedRows) {

					console.log(affectedRows);

					if(affectedRows) {

						user.findById(credentialsObj.userId).then(function(userObj) {

							req.logIn(userObj, function() {
								res.redirect('/');
							});

						});

					}
					else {
						res.send('Something went wrong!');
					}

				});

			}
			else {
				res.send('Activation token is expired or link is invalid.');
			}
		});	
	}
	else {
		res.redirect('/login');
	}
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