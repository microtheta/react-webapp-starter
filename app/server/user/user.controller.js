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
		return res.status(400).render(req.url, {loginerrors: errors, reqBody: req.body});
	}
	

	auth.localAuthenticate(req, res, next, function(err, user, info) {
		if (err) { return next(err); }
		
		if (!user) {
			
			var dataObj = { loginerrors: [info] };

			if(info.notverified) {
				dataObj = { notverified: true };
			}
			if(info.inactive) {
				dataObj = { inactive: true };
			}

			dataObj.reqBody = req.body;

			return res.status(400).render(req.url, dataObj);
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

exports.resendActivationMail = function(req, res) {
	var userEmail = req.body.email;
	user.findByEmail(userEmail).then(function (existingUser) {

		if(existingUser) {

			user.getPassword(existingUser.id).then(function(passwordObj) {
				if(passwordObj && !passwordObj.activationTokenExpired) {

					var userObj = {
						firstName: existingUser.firstName,
						emailVerificationLink: req.protocol + "://" + req.get('host')+'/user/account/'+existingUser.id+'/activate?token=' + passwordObj.activationToken
					}
					
					mailHelper.sendHtmlMail('usersignup', userObj, 'Welcome To Microtheta! Confirm Your Email', existingUser.email);
					
					res.send({'success':true});
				}
				else {
					res.status(400).send({'success':false,'msg':'token expired or not found'});		
				}
				
			}); 
		}
		else {
			res.status(400).send({'success':false,'msg':'User not found'});
		}
	});
};

exports.postForgotPassword = function(req, res) {
	/* TODO: Create reset password token and send a mail */
	res.render(req.url, {errors: 'Work in progress'});
};

exports.getsetUserPassword = function (req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	/* TODO: check if password token is not expired(used) and render password reset form */
	res.render(global.BASE_PATH + '/app/components/user/resetpassword');
};

exports.postsetUserPassword = function (req, res) {
	
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');

	/* TODO: set new password, mark token as expired and inform user about password sucess */
	res.render(global.BASE_PATH + '/app/components/user/resetpassword', {success:true});
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