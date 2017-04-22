const bcrypt = require('bcrypt');

module.exports = {
    crypto: (value, salt = 5) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(value, salt, function (err, crypted) {
                if (err){
                    console.log('Erro ao encriptar: ' + err);
                    reject(err);
                }
                else{
                    resolve(crypted);
                }
            });
        });
    },
    compare: (value, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(value, hash, (err, match) => {
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