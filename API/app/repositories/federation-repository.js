const databaseService = require('../services/database-service');

module.exports = {
    getAll() {
        let sql = 'select id, name from main.federation;'

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    },
    getById(id) {
        let sql = 'select id, name, image_url, site from main.federation where id = ' + id;

        return databaseService.executeQuery(sql).then(data => {
            if (data.rows.length > 0) {
                return data.rows[0];
            }
        });
    },
    save(federation) {
        let sql = '';

        if (federation.id > 0) {
            sql = `update main.federation set 
            name = '${federation.name}',
            site = '${federation.site}',
            image_url = '${federation.image_url}' 
            where id = ${federation.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.federation (name, site, image_url) 
            values ('${federation.name}','${federation.site}','${federation.image_url}') RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    },
};