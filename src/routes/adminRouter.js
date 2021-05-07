const express = require('express');

const { adminAuth } = require('../middlewares/auth');

const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.get('/keys', adminAuth, adminController.getAllKeys);

adminRouter.get('/keys/:keyId', adminAuth, adminController.getKey);

adminRouter.post('/keys/create', adminAuth, adminController.createKey);

adminRouter.put('/keys/edit/:keyId', adminAuth, adminController.editKey);

adminRouter.delete('/keys/delete/:keyId', adminAuth, adminController.deleteKey);

adminRouter.get('/users', adminAuth, adminController.getAllUsers);

adminRouter.put('/user/enlist/:userId', adminAuth, adminController.enlistUser);

adminRouter.put('/user/delist/:userId', adminAuth, adminController.delistUser);

adminRouter.put(
	'/user/make-admin/:userId',
	adminAuth,
	adminController.makeAdmin
);

adminRouter.put(
	'/user/remove-admin/:userId',
	adminAuth,
	adminController.removeAdmin
);

adminRouter.get('/feedback', adminAuth, adminController.getAllFeedback);

module.exports = adminRouter;
