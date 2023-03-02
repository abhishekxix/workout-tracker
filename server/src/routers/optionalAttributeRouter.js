const express = require('express');
const {
  createOptionalAttribute,
  getOptionalAttributes,
  getOptionalAttribute,
} = require('../controllers/optionalAttribute');
const { authentication } = require('../middleware');

const optionalAttributeRouter = express.Router();

optionalAttributeRouter.use(authentication);

optionalAttributeRouter
  .route('/')
  .post(createOptionalAttribute)
  .get(getOptionalAttributes);

optionalAttributeRouter
  .route('/:optionalAttributeID')
  .get(getOptionalAttribute);
module.exports = optionalAttributeRouter;
