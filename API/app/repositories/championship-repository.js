const databaseService = require('../services/database-service');

module.exports = {
    getChampionships(options) {
        let limit = (options.limit) ? 'limit ' + options.limit : '';
        let skip = (options.skip) ? 'offset ' + options.skip : '';
        let orderBy = (options.orderBy) ? options.orderBy.replace('-', '_') : 'name';
        let orderDirection = (options.orderDirection) ? options.orderDirection : 'asc';

        let query = '';

        if (options.query && options.queryColumns) {
            query = 'where ';

            for (let i = 0; i < options.queryColumns.length; i++) {
                let column = options.queryColumns[i];

                if (column == 'name'){
                    column = 'a.name';
                }
                else{
                    column = 'b.name';
                }

                if (i > 0) {
                    query += ' or ';
                }

                query += `${column} ilike '%${options.query}%'`;
            }
        }

        let sql = `select a.id, a.name, a.start_date, a.end_date, 
            b.name as federation, b.id as federation_id from main.championship a 
            inner join main.federation b on (b.id = a.federation_id) 
            ${query} order by ${orderBy} ${orderDirection} ${skip} ${limit} `;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    }
};