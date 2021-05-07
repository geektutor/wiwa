const express = require('express');

const userController = require('../controllers/userController');

const { userAuth, adminAuth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/:username', userController.getUserByUsername);

userRouter.get('/search/:name', userController.getUsersByName);

userRouter.get('/search/skill/:skill', userController.getUsersBySkill);

userRouter.get('/', userController.getUsers);

userRouter.post('/login', userController.login);

userRouter.post('/signup/secret', userController.signupSecret);

userRouter.post('/signup/info', userController.signupInfo);

userRouter.post('/signup/questions', userController.signupQuestions);

userRouter.post('/refresh-token', userController.refreshToken);

userRouter.post('/change-password', userController.changePassword);

userRouter.post('/feedback/create', userAuth, userController.createFeedback);

userRouter.put('/edit/:userId', userAuth, userController.editUser);

userRouter.delete('/delete/:userId', adminAuth, userController.deleteUser);

module.exports = userRouter;
