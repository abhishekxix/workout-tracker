require('express-async-errors');
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

// assign an express instance
const app = express();

// use security middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// other imports
const { connectDB } = require('./db');
const { errorHandler } = require('./middleware');
const { authRouter } = require('./routers');

// configuration
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));

const API_ROOT = '/api/v1';

// routing
app.use(`${API_ROOT}/auth`, authRouter);

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
