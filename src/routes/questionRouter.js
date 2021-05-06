const express = require('express');

const { adminAuth } = require('./../middlewares/auth');

const questionController = require('./../controllers/questionController');

const questionRouter = express.Router();

questionRouter.get('/', adminAuth, questionController.getAllQuestions);

questionRouter.get('/:questionId', adminAuth, questionController.getQuestion);

questionRouter.post('/create', adminAuth, questionController.createQuestion);

questionRouter.put(
	'/edit/:questionId',
	adminAuth,
	questionController.editQuestion
);

questionRouter.delete(
	'/delete/:questionId',
	adminAuth,
	questionController.deleteQuestion
);

module.exports = questionRouter;
