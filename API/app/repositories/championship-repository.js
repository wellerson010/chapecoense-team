const databaseService = require('../services/database-service');
const dateTimeService = require('../services/date-time-service');

module.exports = {
    getById(id){
        let sql = `select id, image_url, site, federation_id, start_date, end_date, name, 
        format, is_champion, final_position, knockout_position from main.championship where id = ${id}`;

        return databaseService.executeQuery(sql).then(data => {
            if (data.rows.length > 0) {
                return data.rows[0];
            }
        });
    },
    getChampionships(options = {}) {
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
    },
    save(championship) {
        let sql = '';

        championship.start_date = dateTimeService.transformToDatabaseDate(championship.start_date);
          championship.end_date = dateTimeService.transformToDatabaseDate(championship.end_date);

        if (championship.id > 0) {
            sql = `update main.championship set 
            name = '${championship.name}',
            site = '${championship.site}',
            image_url = '${championship.image_url}',
            federation_id = ${championship.federation_id},
            start_date = '${championship.start_date}',
            end_date = '${championship.end_date}',
            format = ${championship.format},
            is_champion = ${championship.is_champion},
            final_position = ${championship.final_position},
            knockout_position = ${championship.knockout_position} 
            where id = ${championship.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.championship (name, site, federation_id, image_url, start_date, end_date, 
            format, is_champion, final_position, knockout_position) values 
            ('${championship.name}','${championship.site}', ${championship.federation_id}, '${championship.image_url}', 
            '${championship.start_date}', '${championship.end_date}', ${championship.format},
            ${championship.is_champion}, ${championship.final_position}, ${championship.knockout_position})
             RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    },
};