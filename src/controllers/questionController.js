const responders = require('./../helpers/responders');
const Question = require('../models/question');

const { sendData, sendError, sendSuccess } = responders;

const sanitizeQuestion = (question) => ({
	id: question._id,
	question: question.question,
	answer: question.answer,
});

const getAllQuestions = async (req, res) => {
	try {
		let questions = await Question.find({});
		questions = questions.map(sanitizeQuestion);
		sendData(questions, 200, res);
	} catch (e) {
		console.log(e);
		sendError('Server Error', 500, res);
	}
};

const getQuestion = async (req, res) => {
	const { questionId } = req.params;
	try {
		const question = await Question.findById(questionId);
		if (!question) return sendError('Question not found', 404, res);
		sendData(sanitizeQuestion(question), 200, res);
	} catch (e) {
		console.log(e);
		sendError('Server Error', 500, res);
	}
};

const createQuestion = async (req, res) => {
	const { question, answer } = req.body;
	if (!question || !answer)
		return sendError('Question and Answer must be sent', 400, res);
	const dbQuestion = new Question({
		question,
		answer,
	});
	await dbQuestion.save();
	sendData(sanitizeQuestion(dbQuestion), 201, res);
};

const editQuestion = async (req, res) => {
	const { question, answer } = req.body;
	const { questionId } = req.params;
	if (!question && !answer)
		return sendError('Question or Answer must be sent', 400, res);
	const dbQuestion = await Question.findById(questionId);
	if (!dbQuestion) return sendError('Question not found', 404, res);
	dbQuestion.question = question || dbQuestion.question;
	dbQuestion.answer = answer || dbQuestion.answer;
	await dbQuestion.save();
	sendData(sanitizeQuestion(dbQuestion), 202, res);
};

const deleteQuestion = async (req, res) => {
	const { questionId } = req.params;
	const question = await Question.findByIdAndDelete(questionId);
	console.log('Deleted Question', question);
	//if(!question) return sendError('Question not found', 404, res)
	sendSuccess('Question Deleted', 202, res);
};

module.exports = {
	getAllQuestions,
	getQuestion,
	createQuestion,
	editQuestion,
	deleteQuestion,
};
