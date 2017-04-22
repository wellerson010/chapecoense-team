const pg = require('pg');
const config = require('./config');

const executeQuery = (pool, sql) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                console.error('Erro na obtenção de conexão com o pool: ', err);
                reject(err);
            }

            client.query(sql, (err, result) => {
                console.log(sql);
                done();
                if (err) {
                    console.log('Erro ao fazer query:', err.message);
                    reject(err);
                }
                resolve(result);
            })
        })
    });
};

module.exports = () => {
    let pool = new pg.Pool({
        user: config.database.username,
        database: config.database.databaseName,
        password: config.database.password,
        port: config.database.port,
        host: config.database.host,
        max: config.database.maxConnections,
        idleTimeoutMillis: config.database.idleTimeoutMillis
    });

    return {
        pool: pool,
        executeQuery: executeQuery.bind(this, pool)
    }
}