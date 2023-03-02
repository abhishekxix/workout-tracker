const express = require('express');
const { createOptionalAttribute } = require('../controllers/optionalAttribute');
const { authentication } = require('../middleware');

const optionalAttributeRouter = express.Router();

optionalAttributeRouter.use(authentication);

optionalAttributeRouter.route('/').post(createOptionalAttribute);

module.exports = optionalAttributeRouter;
