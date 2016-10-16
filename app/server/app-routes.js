'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./user/auth');

const userController = require('./user/user.controller');



//api routes
router.post("/login", userController.postLogin);
router.post("/signup", userController.postSignup);
router.get("/logout", userController.logout);
router.get("/user", auth.isAuthenticated, userController.getUser);






/**
	Router : all get routs to be accessed by user should be handled by react-router
**/
// public urls
router.get("/signup", function(request, response, next) {
	response.render(request.url);
});
router.get("/login", function(request, response, next) {
	response.render(request.url);
});


// private urls
router.get('/*', auth.isLoggedIn, function(request, response, next) {
	response.render(request.url,{user: request.user});
});



module.exports = router;
