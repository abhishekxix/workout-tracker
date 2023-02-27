const express = require('express');
const { authentication } = require('../middleware');
const { create } = require('../controllers/dailyStat');

const dailyStatRouter = express.Router();

dailyStatRouter.use(authentication);

dailyStatRouter.post('/create', create);

module.exports = dailyStatRouter;
