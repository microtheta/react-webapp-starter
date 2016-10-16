'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require(global.BASE_PATH + '/app/dao/user.dao');


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
		return done(null, userObj);
	})
	.catch(function () {
		return done(null, false, { msg: 'Invalid email or password.' });
	});

	/*
	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (err) { return done(err); }

		if (!user) {
			return done(null, false, { msg: `Email ${email} not found.` });
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) { return done(err); }

			if (isMatch) {
				return done(null, user);
			}

			return done(null, false, { msg: 'Invalid email or password.' });
		});

	}); */

}));

module.exports =  {
	initialize: function(app){
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