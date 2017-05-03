const router = require('express').Router();
const authService = require('../services/auth-service')();
const opponentRepository = require('../repositories/opponent-repository');

router.get('/all', authService.authenticate(), (req, res) => {
    opponentRepository.getAll({
        orderDirection: 'asc'
    }).then(data => {
        res.json(data);
    });
});

router.post('/get-all-to-vue-tables', authService.authenticate(), (req, res) => {
    opponentRepository.getAll({
        limit: req.body.limit,
        skip: (req.body.page - 1) * req.body.limit,
        orderDirection: (req.body.ascending) ? 'asc' : 'desc',
        query: req.body.query,
    }).then(data => {
        res.json({
            count: 10,
            data: data
        });
    });
});

router.get('/get/:id', authService.authenticate(), (req, res) => {
    let id = req.params.id;

    opponentRepository.getById(id).then(data => {
        res.json(data);
    });
});

router.post('/save', authService.authenticate(), (req, res) => {
    let opponent = req.body;

    opponentRepository.save(opponent).then(opponentId => {
        res.json(opponentId);
    });
});

module.exports = router;