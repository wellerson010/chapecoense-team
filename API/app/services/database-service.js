const database = require('../config/database')();

module.exports = {
    executeQuery: database.executeQuery
}