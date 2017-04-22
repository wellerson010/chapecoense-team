const router = require('express').Router();
const jwt = require('jwt-simple');

const authService = require('../services/auth-service');
const config = require('../config/config');
const cryptoService = require('../services/crypto-service');
const userRepository = require('../repositories/user-repository');

router.post('/authenticate', (req, res) => {
    let { login, password } = req.body;

    let userDatabase = null;

    userRepository.getUserByLogin(login).then(user => {
        if (user) {
            userDatabase = user;
            return cryptoService.compare(password, user.password);
        }
        else {
            res.json({
                authenticate: false
            });
        }
    }).then(match => {
        if (match) {
            res.json({
                token: jwt.encode({
                    id: userDatabase.id
                }, config.authentication.jwtSecret),
                authenticate: true
            });
        }
        else {
            res.json({
                authenticate: false
            });
        }
    });

    if (email == app.config.passport.login && password == app.config.passport.password) {
        res.json({
            token: jwt.encode({
                email: email,
                password: password
            }, app.config.passport.jwtSecret)
        });
    }
    else {
        res.sendStatus(401);
    }
});

module.exports = router;