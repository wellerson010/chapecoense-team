const router = require('express').Router();
const authService = require('../services/auth-service')();
const championshipRepository = require('../repositories/championship-repository');

router.get('/get', authService.authenticate(), (req, res) => {
    championshipRepository.getChampionships().then(data => {
        res.json(data);
    });
});

router.post('/get-all-to-vue-tables', authService.authenticate(), (req, res) => {
    championshipRepository.getChampionships({
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

router.get('/get/:id', (req, res) => {
    let id = req.params.id;

    championshipRepository.getById(id).then(championship => {
        res.json(championship);
    })
});

router.post('/save', authService.authenticate(), (req, res) => {
    let championship = req.body;

    championshipRepository.save(championship).then(championshipId => {
        res.json(true);
    });
});

module.exports = router;