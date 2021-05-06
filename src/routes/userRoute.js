const express = require('express');

const userController = require('./../controllers/userController');

const { userAuth, adminAuth } = require('./../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/:userId', userAuth, userController.getUserById);

userRouter.get('/:name', userAuth, userController.getUsersByName);

userRouter.get('/', userAuth, userController.getUsers);

userRouter.post('/login', userController.login);

userRouter.post('/signup', userController.signup);

userRouter.put('/edit/:userId', userAuth, userController.editUser);

userRouter.delete('/delete/:userId', adminAuth, userController.deleteUser);

module.exports = userRouter;
