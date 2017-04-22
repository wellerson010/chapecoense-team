const databaseService = require('../services/database-service');

module.exports = {
    getUserById: id => {
        let sql = `select * from main.user where id ${id}`;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0];
        });
    },
    getUserByLogin: login => {
        let sql = `select * from main.user where login '${login}'`;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0];
        });
    }
}