const express = require('express');
const { createSet } = require('../controllers/set');
const { authentication } = require('../middleware');

const setRouter = express.Router();

setRouter.use(authentication);

setRouter.route('/').post(createSet);

module.exports = setRouter;
