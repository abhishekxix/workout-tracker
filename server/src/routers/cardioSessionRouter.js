const express = require('express');
const {
  createCardioSession,
  getCardioSessions,
  getCardioSession,
  updateCardioSession,
} = require('../controllers/cardioSession');
const { authentication } = require('../middleware');

const cardioSessionRouter = express.Router();

cardioSessionRouter.use(authentication);

cardioSessionRouter.route('/').post(createCardioSession).get(getCardioSessions);
cardioSessionRouter
  .route('/:cardioSessionID')
  .get(getCardioSession)
  .patch(updateCardioSession);

module.exports = cardioSessionRouter;
