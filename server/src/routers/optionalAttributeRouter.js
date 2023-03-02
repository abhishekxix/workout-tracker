const express = require('express');
const {
  createOptionalAttribute,
  getOptionalAttributes,
} = require('../controllers/optionalAttribute');
const { authentication } = require('../middleware');

const optionalAttributeRouter = express.Router();

optionalAttributeRouter.use(authentication);

optionalAttributeRouter
  .route('/')
  .post(createOptionalAttribute)
  .get(getOptionalAttributes);

module.exports = optionalAttributeRouter;
