'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require(global.BASE_PATH + '/app/dao/user.dao');
const constants = require(global.BASE_PATH + '/app/constants');
var bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	
	/* TODO: find a better way to do this */

	user.findById(id).then(function (userObj) {
		done(null, userObj);
	});
});


/**
* Sign in using Email and Password.
*/
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

	user.findByEmail(email).then(function (userObj) {
		if(!userObj) {
			return done(null, false, { msg: 'Invalid email or password.' });
		}
		
		user.getPassword(userObj.id).then(function(userPass) {
			bcrypt.compare(password, userPass.password, function(err, isMatch) {

				if(isMatch) {
					
					if(!userObj.isEmailVerified) {
						return done(null, false, { notverified: true });
					}

					if(!userObj.isActive) {
						return done(null, false, { inactive: true });
					}

					return done(null, userObj);
				}
				else { //password not matching
					return done(null, false, { msg: 'Invalid email or password' });
				}
			});
		});
	})
	.catch(function () {
		return done(null, false, { msg: 'Something went wrong! Please get in touch with us at: '+ constants.SUPPORTEMAIL });
	});

}));

module.exports = {
	initialize: function(app) {
		app.use(passport.initialize());
		app.use(passport.session());
	},
	localAuthenticate: function(req, res, next, cb) {
		passport.authenticate('local',cb)(req, res, next);
	},
	logOut: function(req, res, cb) {
		req.logout();
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
		cb();
	},
	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	},
	isAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.status(401).send();
	}
}