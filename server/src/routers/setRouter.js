const express = require('express');
const {
  createSet,
  getSets,
  updateSet,
  deleteSet,
} = require('../controllers/set');
const getSet = require('../controllers/set/getSet');
const { authentication } = require('../middleware');

const setRouter = express.Router();

setRouter.use(authentication);

setRouter.route('/').post(createSet).get(getSets);
setRouter.route('/:setID').get(getSet).patch(updateSet).delete(deleteSet);

module.exports = setRouter;
