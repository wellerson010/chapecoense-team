const express = require('express');
const app = express();
const middleware = require('./app/config/middleware');
const config = require('./app/config/config');

//constrollers

const authController = require('./app/controllers/auth-controller');
const championshipController = require('./app/controllers/championship-controller');
const federationController = require('./app/controllers/federation-controller')
const gameController = require('./app/controllers/game-controller');
const opponentController = require('./app/controllers/opponent-controller')
const playersController = require('./app/controllers/players-controller');
const positionController = require('./app/controllers/position-controller');

middleware(app);

app.use('/auth', authController);
app.use('/championship', championshipController);
app.use('/federation', federationController);
app.use('/game', gameController);
app.use('/players', playersController);
app.use('/position', positionController);
app.use('/opponent', opponentController);

app.listen(config.port, () => console.log('Estou ouvindo na porta: ' + config.port));