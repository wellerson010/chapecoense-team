const database = require('../config/database')();

module.exports = {
    executeQuery: database.executeQuery,
    getFirstResult(sql) {
        return database.executeQuery(sql).then(data => {
            return data.rows[0];
        });
    }
}