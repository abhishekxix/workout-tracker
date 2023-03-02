const express = require('express');
const {
  createCardioSession,
  getCardioSessions,
} = require('../controllers/cardioSession');
const { authentication } = require('../middleware');

const cardioSessionRouter = express.Router();

cardioSessionRouter.use(authentication);

cardioSessionRouter.route('/').post(createCardioSession).get(getCardioSessions);

module.exports = cardioSessionRouter;
