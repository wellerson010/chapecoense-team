const router = require('express').Router();
const positionRepository = require('../repositories/position-repository');
const authService = require('../services/auth-service')();

router.get('/all', authService.authenticate(), (req, res) => {
    positionRepository.getAll().then(positions => {
        res.json(positions);
    });
});

router.get('/get/:id', authService.authenticate(), (req,res) => {
    let id = req.params.id;

    positionRepository.getById(id).then(position => {
        res.json(position);
    });
});

router.post('/save', authService.authenticate(), (req,res) => {
    let position = req.body;

    positionRepository.save(position).then(id => {
        res.json(id);
    });
});

module.exports = router;