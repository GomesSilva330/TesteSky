const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authService = require('../services/jwtService');

//user
router.get('/user/:id', authService.verify, userController.get);

//auth
router.post('/auth/signup', authController.signUp);
router.post('/auth/signin', authController.signIn);

router.use((req, resp) => resp.status(404).json({ error: 'Endpoint não encontrado' }));

module.exports = router;