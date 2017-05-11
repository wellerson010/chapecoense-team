const databaseService = require('../services/database-service');

module.exports = {
    save(data, table) {
        let sql = '';

        if (game.id > 0) {
            sql = buildUpdateSql(data, table);
        }
        else {
            sql = buildInsertSql(data, table);
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    }
}

function buildUpdateSql(data, table) {
    let sqlFields = '';

    for (var property in data) {
        if (property != id) {
            if (sqlFields){
                sqlFields += ',';
            }

            sqlFields += `${property} = '${data[property]}'`;
        }
    }

    let sql =  `update ${table} set ${sqlFields} where id = ${data.id} RETURNING ID`

    return sql;
}

function buildInsertSql(data,table){
    let sqlFields = '',
        sqlValues = '';

    for (var property in data){
        if (property != 'id'){
            if (sqlFields){
                sqlFields = ',';
                sqlValues = ',';
            }

            sqlFields += property;
            sqlValues += `'${data[property]}'`;
        }
    }

    let sql = `insert into ${table} (${sqlFields}) values (${sqlValues}) RETURNING ID`;
    return sql;
}