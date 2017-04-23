const databaseService = require('../services/database-service');

module.exports = {
    deleteFromSquad: (id) => {
        let sql = `update main.player set in_team = false where id = ` + id;

        return databaseService.executeQuery(sql).then(data => {
            return data.rowCount;
        });
    },
    getPlayerToEditById(id) {
        let sql = `select player.*, 
        (SELECT string_agg(position_id::text, ',') as pos_sec FROM main.position_secundary_player 
        pos_sec inner join main.player player on (player.id = pos_sec.player_id) where player.id = ${id}) as pos_sec 
        from main.player player where id = ` + id;

        return databaseService.executeQuery(sql).then(data => {
            if (data.rows.length > 0) {
                let player = data.rows[0];

                if (player.pos_sec) {
                    player.pos_sec = player.pos_sec.split(',');
                }
                else {
                    player.pos_sec = [];
                }
                return player;
            }
        });
    },
    getPlayers: (options = {}) => {
        //orderColumn, query
        let limit = (options.limit) ? 'limit ' + options.limit : '';
        let skip = (options.skip) ? 'offset ' + options.skip : '';
        let orderBy = (options.orderBy) ? options.orderBy : 'name';
        let orderDirection = (options.orderDirection) ? options.orderDirection : 'asc';
        let query = '';

        if (options.query && options.queryColumns) {
            query = 'where ';

            for (let i = 0; i < options.queryColumns.length; i++) {
                let column = options.queryColumns[i];

                if (i > 0) {
                    query += ' or ';
                }

                query += `${column} ilike '%${options.query}%'`;
            }
        }

        if (orderBy == 'position') {
            orderBy = 'position.short_name';
        }
        else {
            orderBy = 'player.' + orderBy;
        }

        let sql = `select player.name, player.id, player.psn,
         player.in_team, position.short_name as position from main.player player
        inner join main.position position on (position.id = player.main_position_id) 
        ${query} order by ${orderBy} ${orderDirection} ${skip} ${limit} `;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    },
    getSquad: () => {
        let sql = `select player.name, player.id, player.psn, position.short_name as position from main.player player
        inner join main.position position on (position.id = player.main_position_id)
        where player.in_team = true order by player.name`;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    },
    save: (player) => {
        let sql = '';

        if (player.id > 0) {
            sql = `update main.player set 
            name = '${player.name}',
            psn = '${player.psn}',
            image_url = '${player.image_url}',
            in_team = ${player.in_team},
            main_position_id = ${player.main_position_id}  
            where id = ${player.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.player (name, psn, image_url, in_team, main_position_id) 
            values ('${player.name}','${player.psn}','${player.image_url}',${player.in_team},${player.main_position_id}) RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    }
}