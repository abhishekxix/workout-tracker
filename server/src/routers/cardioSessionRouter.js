const express = require('express');
const { createCardioSession } = require('../controllers/cardioSession');
const { authentication } = require('../middleware');

const cardioSessionRouter = express.Router();

cardioSessionRouter.use(authentication);

cardioSessionRouter.route('/').post(createCardioSession);

module.exports = cardioSessionRouter;
