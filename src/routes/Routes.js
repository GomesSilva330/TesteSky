const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authService = require('../services/jwtService');

//user
router.get('/user/:id', authService.verify, userController.get);
router.get('/user', authService.verify, userController.getAll);

//auth
router.post('/auth/signup', authController.signUp);
router.post('/auth/signin', authController.signIn);

module.exports = router;