const router = require('express').Router();
const authService = require('../services/auth-service')();
const gameRepository = require('../repositories/game-repository');

router.post('/save', authService.authenticate(), (req, res) => {
    let game = req.body;

    gameRepository.save(game).then(gameId => {
        res.json(true);
    });
});

module.exports = router;