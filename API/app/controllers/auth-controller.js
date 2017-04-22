const router = require('express').Router();
const jwt = require('jwt-simple');

const authService = require('../services/auth-service');
const config = require('../config/config');
const cryptoService = require('../services/crypto-service');
const userRepository = require('../repositories/user-repository');

router.post('/authenticate', (req, res) => {
    let { login, password } = req.body;

    if (!login || !password) {
        res.json({
            error: true,
            message: 'Usuário e/ou password vazio!'
        });
    }
    else {

        let userDatabase = null;

        userRepository.getUserByLogin(login).then(user => {
            if (user) {
                userDatabase = user;
                return cryptoService.compare(password, user.password);
            }
        }).then(match => {
            if (match) {
                res.json({
                    token: jwt.encode({
                        id: userDatabase.id
                    }, config.authentication.jwtSecret),
                    authenticate: true,
                    user: {
                        name: userDatabase.login
                    }
                });
            }
            else {
                res.json({
                    authenticate: false
                });
            }
        });
    }
});

//rota temporária
router.post('/create-user', (req, res) => {
    let { login, password } = req.body;

    if (!login || !password) {
        res.json({
            error: true,
            message: 'Usuário e/ou password vazio!'
        });
    }
    else{
        cryptoService.crypto(password).then(passwordCrypted => {
            return userRepository.createUser(login, passwordCrypted);
        }).then(data => {
            res.json({
                ok: true
            });
        }).catch(err => {
            res.json({
                error: true,
                message: err.message
            });
        });
    }
})

module.exports = router;