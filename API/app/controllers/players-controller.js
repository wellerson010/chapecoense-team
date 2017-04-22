const router = require('express').Router();
const playerRepository = require('../repositories/player-repository');
const authService = require('../services/auth-service')();

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
    res.json({
        data: [],
        count: 1
    });
});

module.exports = router;