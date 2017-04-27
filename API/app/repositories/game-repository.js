const databaseService = require('../services/database-service');

module.exports = {
   /* getAll() {
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
    }, */
    save(game) {
        let sql = '';

        if (game.id > 0) {
            sql = `update main.game set 
            opponent_id = ${game.opponent_id},
            championship_id = ${game.championship_id},
            phase = '${game.phase}',
            goals_opponent = ${game.goals_opponent},
            goals_my = ${game.goals_my},
            in_home = ${game.in_home},
            date_game = '${game.date_game}',
            where id = ${game.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.federation (opponent_id, championship_id, phase, goals_opponent,
            goals_my, in_home, date_game) 
            values (${game.opponent_id}, ${game.championship_id}, '${game.phase}', ${game.goals_opponent},
            ${game.goals_my}, ${game.in_home}, '${game.date_game}') RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    },
};