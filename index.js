'use strict';

// Babel require hook at the top to ensure parsing of JSX files
require('babel-register')({
	presets: ['es2015', 'react'],
	only: '*.jsx'
});

global.BASE_PATH = __dirname;


const express = require('express');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ReactEngine = require('react-engine');
const compression = require('compression');
const session = require('express-session');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');



/**
	Load environment variables from .env file, where API keys and passwords are configured.
**/
dotenv.load({ path: '.env.example' });


/**
	Create Express server.
**/
const app = express();
app.use(logger('dev'));
app.use(compression());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET
}));
app.use(bodyParser.json());  // parse the request body and make it availabel as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


/**
	Passport init
**/
const auth = require('./app/server/user/auth');
auth.initialize(app);

// After successful login, redirect back to the intended page
app.use(function(req, res, next) {
	if (!req.user &&
		req.path !== '/login' &&
		req.path !== '/signup' &&
		!req.path.match(/^\/auth/) &&
		!req.path.match(/\./)) {
		req.session.returnTo = req.path;
	}
	next();
});


// create an engine instance
const reactRoutesFilePath = path.join(__dirname + '/app/components/react-routes.jsx');
const engine = ReactEngine.server.create({
	routes: require(reactRoutesFilePath),
	routesFilePath: reactRoutesFilePath
});


/** 
	set the react rendering engine
**/
app.engine('.jsx', engine);

// which directory to look for the view
app.set('views', __dirname + '/app');

// set jsx or js as the view engine
// (without this you would need to supply the extension to res.render())
// ex: res.render('index.jsx') instead of just res.render('index').
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', require('react-engine/lib/expressView'));


// allow accessing static content put under the public dir
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/bower_components', express.static(path.join(__dirname, './bower_components')));
// auto generated build files 
app.use('/build', express.static(path.join(__dirname, './build')));


// application routes
app.use(require('./app/server/app-routes.js'));

/**
	Error Handler. // not advised for production env...
**/
app.use(errorHandler());



/**
	Express configuration.
**/
app.set('port', process.env.PORT || 9093);

/**
	Start Express server.
**/
var server = app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = server;