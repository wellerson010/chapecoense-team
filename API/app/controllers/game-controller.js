const router = require('express').Router();
const authService = require('../services/auth-service')();
const gameRepository = require('../repositories/game-repository');

router.post('/get-all-to-vue-tables', authService.authenticate(), (req, res) => {
    gameRepository.getAll({
        limit: req.body.limit,
        skip: (req.body.page - 1) * req.body.limit,
        orderBy: req.body.orderBy,
        orderDirection: (req.body.ascending) ? 'asc' : 'desc',
        query: req.body.query,
        queryColumns: ['name', 'federation']
    }).then(data => {
        res.json({
            data: data,
            count: 10
        });
    });
});

router.get('/get/:id', authService.authenticate(), (req, res) => {
    let id = req.params.id;

    gameRepository.getById(id).then(data => {
        res.json(data);
    });
});

router.post('/save', authService.authenticate(), (req, res) => {
    let game = req.body;

    gameRepository.save(game).then(gameId => {
        res.json(true);
    });
});

module.exports = router;