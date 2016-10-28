'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./user/auth');

const userController = require('./user/user.controller');


router.get('/user/account/:userId/activate', userController.activateAccount); //link sent to email
router.get('/user/account/:userId/setpassword', userController.getsetUserPassword); //link sent to email
router.post('/user/account/:userId/setpassword', userController.postsetUserPassword);

//api routes
router.post('/api/user/signup', userController.postSignup);
router.post('/api/user/login', userController.postLogin);
router.post('/api/user/forgotpassword', userController.postForgotPassword);
router.post('/api/activationmail', userController.resendActivationMail);
router.get('/api/userdetails', auth.isAuthenticated, userController.getUserDetails);


router.post('/api/test', function(req, res){
	setTimeout(function(){
		res.status(200).send(req.body);
	},5000);
});


router.get('/user', auth.isAuthenticated, userController.getUser);


/**
	Router : all get routs to be accessed by user should be handled by react-router
**/
// public urls
router.get('/signup', function(req, res) { res.render(req.url); });
router.get('/login', function(req, res) { res.render(req.url); });
router.get('/logout', userController.logout);
router.get('/forgotpassword', function(req, res) { res.render(req.url); });


// private urls
router.get('/*', auth.isLoggedIn, function(req, res) { 
	res.render(req.url, {user: req.user}); 
});


module.exports = router;
