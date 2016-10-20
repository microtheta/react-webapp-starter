'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./user/auth');

const userController = require('./user/user.controller');


router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
router.post('/forgotpassword', userController.postForgotPassword);
router.get('/logout', userController.logout);
router.get('/user/account/:userId/activate', userController.activateAccount); //link sent to email
router.get('/user/account/:userId/setpassword', userController.getsetUserPassword); //link sent to email
router.post('/user/account/:userId/setpassword', userController.postsetUserPassword);

//api routes
router.post('/api/activationmail', userController.resendActivationMail);


router.get('/user', auth.isAuthenticated, userController.getUser);




/**
	Router : all get routs to be accessed by user should be handled by react-router
**/
// public urls
router.get('/signup', function(req, res) { res.render(req.url); });
router.get('/login', function(req, res) { res.render(req.url); });
router.get('/forgotpassword', function(req, res) { res.render(req.url); });


// private urls
router.get('/*', auth.isLoggedIn, function(req, res) { 
	res.render(req.url, {user: req.user}); 
});


module.exports = router;
