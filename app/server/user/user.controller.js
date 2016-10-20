'use strict';

const auth = require('./auth');
const user = require(global.BASE_PATH + '/app/dao/user.dao');
const mailHelper = require(global.BASE_PATH + '/app/server/utils/mailhelper');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

exports.postSignup = function(req, res) {

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

exports.activateAccount = function (req, res) {
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

		if (err) { res.status(500).send(); }
		
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
			res.redirect('/');
		});
	});
};

exports.resendActivationMail = function(req, res) {
	
	if(req.body.email) {

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
	}
	else {
		return res.status(400).send({'success':false,'msg':'Email not found'});
	}
};

exports.postForgotPassword = function(req, res) {

	/* Create  passwordresettoken and send a mail */

	req.checkBody('email', 'Invalid email address').notEmpty().isEmail();
	var errors = req.validationErrors();
	if(errors) {
		return res.status(400).render(req.url, {errors: errors});
	}
	user.findByEmail(req.body.email).then(function (existingUser) {
		if(existingUser) {

			crypto.randomBytes(16, (err, buf) => {

				const token = buf.toString('hex');
				
				var tempPasswordObj = {
					userId: existingUser.id,
					passwordResetToken: token,
					passwordResetTokenExpired: false /* TODO: update creation time */
				};

				user.saveCredentials(tempPasswordObj).then(function() {

					tempPasswordObj.firstName = existingUser.firstName;
					tempPasswordObj.emailVerificationLink = req.protocol + "://" + req.get('host')+'/user/account/'+existingUser.id+'/setpassword?token=' + token;
					mailHelper.sendHtmlMail('passwordreset', tempPasswordObj, 'Microtheta - Password Reset', existingUser.email);

					res.render(req.url, {success: true, email:existingUser.email });
				});
			});
		}
		else {
			res.status(400).render(req.url, {email: req.body.email, errors: [{msg: 'Email address not found. Please check your email address or sign up for a new account.'}]});
		}
	});
};

exports.getsetUserPassword = function (req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	/* check if password token is not expired(used) and render password reset form */
	if(req.params.userId && req.query.token) {
		user.validatePasswordResetToken(req.query.token, req.params.userId).then(function(credentialsObj) {
			if(credentialsObj) {
				res.render('./components/user/resetpassword');
			}
			else {
				res.status(400).send('Token is expired or link is invalid.');
			}
		});
	} else {
		res.redirect('/login');
	}
};

exports.postsetUserPassword = function (req, res) {
	
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	/* set new password, mark token as expired and inform user about password success */

	if(req.body.password === req.body.confirmpassword) {
		user.validatePasswordResetToken(req.query.token, req.params.userId).then(function(credentialsObj) {
			if(credentialsObj) {
				bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
					credentialsObj.updateAttributes({
						password: hash,
						passwordResetTokenExpired: true
					}).then(function() {
						return res.render('./components/user/resetpassword', {success:true});
					});
				});
			}
			else {
				return res.status(400).send('Token is expired or link is invalid.');
			}
		});
	}
	else {
		res.render('./app/components/user/resetpassword', {errors:'Password and confirm Password is not matching.'});
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