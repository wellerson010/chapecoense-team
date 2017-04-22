const config = {
    authentication: {
        jwtSecret: 'Team123xx.&&',
    },
    database: {
        databaseName: 'team',
        host: '127.0.0.1',
        password: 'GHq2w3',
        port: 5432,
        username: 'postgres',
        maxConnections: 20,
        idleTimeoutMillis: 30000
    },
    port: 3000,
};

module.exports = config;