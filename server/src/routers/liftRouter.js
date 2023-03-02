const express = require('express');
const {
  createLift,
  getLifts,
  getLift,
  updateLift,
  deleteLift,
} = require('../controllers/lift');
const { authentication } = require('../middleware');

const liftRouter = express.Router();

liftRouter.use(authentication);

liftRouter.route('/').post(createLift).get(getLifts);
liftRouter.route('/:liftID').get(getLift).patch(updateLift).delete(deleteLift);
module.exports = liftRouter;
