const router = require('express').Router();
const authService = require('../services/auth-service')();
const federationRepository = require('../repositories/federation-repository');

router.get('/all', authService.authenticate(), (req, res) => {
    federationRepository.getAll().then(data => {
        res.json(data);
    });
});

router.get('/get/:id', authService.authenticate(), (req, res) => {
    let id = req.params.id;

    federationRepository.getById(id).then(data => {
        res.json(data);
    });
});

router.post('/save', authService.authenticate(), (req, res) => {
    let federation = req.body;

    federationRepository.save(federation).then(federationId => {
        res.json(federationId);
    });
});

module.exports = router;