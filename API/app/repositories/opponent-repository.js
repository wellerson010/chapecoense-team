const databaseService = require('../services/database-service');

module.exports = {
    getAll(options = {}){
        //orderColumn, query
        let limit = (options.limit) ? 'limit ' + options.limit : '';
        let skip = (options.skip) ? 'offset ' + options.skip : '';
        let orderDirection = (options.orderDirection) ? options.orderDirection : 'asc';
        let query = (options.query) ? `where name ilike '%${options.query}%'`: '';

        let sql = `select id, name from main.opponent ${query} 
        order by name ${orderDirection} ${skip} ${limit} `;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    },
    getById(id){
        let sql = 'select id, name, image_url, facebook from main.opponent where id = ' + id;

         return databaseService.executeQuery(sql).then(data => {
            if (data.rows.length > 0){
                return data.rows[0];
            }
        });
    },
    save(opponent) {
        let sql = '';

        if (opponent.id > 0) {
            sql = `update main.opponent set 
            name = '${opponent.name}',
            facebook = '${opponent.facebook}',
            image_url = '${opponent.image_url}' 
            where id = ${opponent.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.opponent (name, facebook, image_url) 
            values ('${opponent.name}','${opponent.facebook}','${opponent.image_url}') RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    },
}