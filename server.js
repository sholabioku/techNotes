const express = require('express');
const colors = require('colors');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.use('/', express.static(path.join(__dirname, '/public')));

app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`.yellow.bold)
);
