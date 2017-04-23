const router = require('express').Router();
const authService = require('../services/auth-service')();
const playerRepository = require('../repositories/player-repository');
const positionRepository = require('../repositories/position-repository');

router.get('/squad', authService.authenticate(), (req, res) => {
    playerRepository.getSquad().then(data => {
        res.json(data);
    });
});

router.delete('/delete-from-squad', authService.authenticate(), (req, res) => {
    let id = req.body.id;

    playerRepository.deleteFromSquad(id).then(data => {
        res.json(data);
    });
});

router.post('/get-players-to-vue-tables', authService.authenticate(), (req, res) => {
    //query,limit,page,orderBy,ascending,byColumn
    playerRepository.getPlayers({
        limit: req.body.limit,
        skip: (req.body.page - 1) * req.body.limit,
        orderBy: req.body.orderBy,
        orderDirection: (req.body.ascending)?'asc':'desc',
        query: req.body.query,
        queryColumns: ['name', 'psn']
    }).then(data => {
        res.json({
            count: 10,
            data: data
        });
    });
});

router.get('/edit/:id', authService.authenticate(), (req, res) => {
    let id = req.params.id;

    playerRepository.getPlayerToEditById(id).then(player => {
        res.json(player);
    });
});

router.post('/save', authService.authenticate(), (req, res) => {
    let player = req.body;

    playerRepository.save(player).then(playerId => {
        return positionRepository.updatePositionsSecondary(playerId, player.pos_sec);
    }).then(data => {
        res.json(true);
    });
});

module.exports = router;