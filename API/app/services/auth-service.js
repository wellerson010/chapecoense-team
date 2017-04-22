const passportJWT = require('passport-jwt');
const passport = require('passport');

const config = require('../config/config');
const userRepository = require('../repositories/user-repository');

let paramsStrategy = {
    secretOrKey: config.authentication.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader()
};

module.exports = () => {
    const strategy = new passportJWT.Strategy(paramsStrategy, (payload, done) => {
        userRepository.getUserById(payload.id).then(user => {
            if (!user) {
                return done(null, false);
            }
            else {
                return done(null, {
                    login: user.login,
                    id: user.id
                });
            }
        });
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', {
            session: false
        })
    }
}