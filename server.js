require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(PORT, () =>
    console.log(
      `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
