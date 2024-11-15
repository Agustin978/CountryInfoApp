const express = require('express');
const countriesRoutes = require('./src/routes/countries');

const app = express();
const port = process.env.PORT || 3000;

app.use('/countries', countriesRoutes);
module.exports = app;