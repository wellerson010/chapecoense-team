const bcrypt = require('bcrypt');

module.exports = {
    compare: (value, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(payload.password, user.password, (err, match) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(match);
                }
            });
        });
    }
}