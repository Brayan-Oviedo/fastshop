const express = require('express');
const ordersController = require('./api/ordersController');
const app = express();

app.use(express.json());
app.use('/api', ordersController);

module.exports = app;
