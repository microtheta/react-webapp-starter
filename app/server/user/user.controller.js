'use strict';

const auth = require('./auth');

exports.postLogin = function(req, res, next) {

	if (req.body.email && req.body.password) {
		auth.localAuthenticate(req, res, next, function(err, user, info) {
			if (err) { return next(err); }
			
			if (!user) {
				return res.redirect('/login');
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

exports.logout = function(req, res, next) {
	auth.logOut(req, res, function() {
		res.redirect('/');
	});
};

exports.getUser = function(req, res, next) {
	res.send(req.user);
};