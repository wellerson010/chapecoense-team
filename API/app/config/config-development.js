const config = {
    port: 3000,
    hostDatabase: '127.0.0.1',
    portDatabase: '6100',
    database: 'team',
    username: 'postgres',
    password: 'GHq2w3',
    passport: {
        jwtSecret: 'Blog123xx.&&',
        jwtSession: {
            session: false
        }
    }
};

module.exports = config;