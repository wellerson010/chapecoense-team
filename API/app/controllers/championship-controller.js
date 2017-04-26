const router = require('express').Router();
const authService = require('../services/auth-service')();
const championshipRepository = require('../repositories/championship-repository');

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

module.exports = router;