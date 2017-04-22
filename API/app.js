const express = require('express');
const app = express();
const middleware = require('./app/config/middleware');
const config = require('./app/config/config');

//constrollers

const authController = require('./app/controllers/auth-controller');
const playersController = require('./app/controllers/players-controller');

middleware(app);

app.use('/auth', authController);
app.use('/players', playersController);

app.listen(config.port, () => console.log('Estou ouvindo na porta: ' + config.port));