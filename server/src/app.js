require('express-async-errors');
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

// assign an express instance
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// use security middleware
app.use(helmet());
app.use(cors());
app.use(xss());

// other imports
const { connectDB } = require('./db');
const { errorHandler } = require('./middleware');
const {
  authRouter,
  userRouter,
  dailyStatRouter,
  measurementRouter,
  workoutSessionRouter,
  liftRouter,
  setRouter,
  cardioSessionRouter,
  optionalAttributeRouter,
} = require('./routers');

// configuration
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));

const API_ROOT = '/api/v1';

// routing
app.use(`${API_ROOT}/auth`, authRouter);
app.use(`${API_ROOT}/user`, userRouter);
app.use(`${API_ROOT}/dailyStat`, dailyStatRouter);
app.use(`${API_ROOT}/measurement`, measurementRouter);
app.use(`${API_ROOT}/workoutSession`, workoutSessionRouter);
app.use(`${API_ROOT}/lift`, liftRouter);
app.use(`${API_ROOT}/set`, setRouter);
app.use(`${API_ROOT}/cardioSession`, cardioSessionRouter);
app.use(`${API_ROOT}/optionalAttribute`, optionalAttributeRouter);

// error handling
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
