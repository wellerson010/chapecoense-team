const databaseService = require('../services/database-service');

module.exports = {
    getById(id){
        let sql = 'select id, full_name, short_name from main.position where id = ' + id;
        return databaseService.executeQuery(sql).then(data => {
            if (data.rows.length > 0){
                return data.rows[0];
            };
        });
    },
    getAll() {
        let sql = 'select id, full_name, short_name from main.position order by full_name';

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    },
    save(position) {
        let sql = '';

        if (position.id > 0) {
            sql = `update main.position set 
            full_name = '${position.full_name}',
            short_name = '${position.short_name}' 
            where id = ${position.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.position (full_name, short_name) 
            values ('${position.full_name}','${position.short_name}') RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    },
    updatePositionsSecondary(playerId, positions) {
        let sql = `delete from main.position_secundary_player where player_id = ${playerId};`;

        for (let id of positions) {
            sql += `insert into main.position_secundary_player values(${playerId}, ${id});`
        }

        return databaseService.executeQuery(sql).then(data => {
            return data;
        });
    }
}