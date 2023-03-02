const express = require('express');
const { createSet, getSets } = require('../controllers/set');
const { authentication } = require('../middleware');

const setRouter = express.Router();

setRouter.use(authentication);

setRouter.route('/').post(createSet).get(getSets);

module.exports = setRouter;
