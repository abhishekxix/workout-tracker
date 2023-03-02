const express = require('express');
const {
  createOptionalAttribute,
  getOptionalAttributes,
  getOptionalAttribute,
  updateOptionalAttribute,
  deleteOptionalAttribute,
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
  .get(getOptionalAttribute)
  .patch(updateOptionalAttribute)
  .delete(deleteOptionalAttribute);
module.exports = optionalAttributeRouter;
