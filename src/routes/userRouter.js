const express = require('express');

const userController = require('../controllers/userController');

const { userAuth, adminAuth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/:userId', userAuth, userController.getUserById);

userRouter.get('/search/:name', userAuth, userController.getUsersByName);

userRouter.get(
	'/search/skill/:skill',
	userAuth,
	userController.getUsersBySkill
);

userRouter.get('/', userAuth, userController.getUsers);

userRouter.post('/login', userController.login);

userRouter.post('/signup/secret', userController.signupSecret);

userRouter.post('/signup/info', userController.signupInfo);

userRouter.post('/signup/questions', userController.signupQuestions);

userRouter.post('/refresh-token', userController.refreshToken);

userRouter.post('/change-password', userController.changePassword);

userRouter.put('/edit/:userId', userAuth, userController.editUser);

userRouter.delete('/delete/:userId', adminAuth, userController.deleteUser);

module.exports = userRouter;
