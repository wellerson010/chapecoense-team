const databaseService = require('../services/database-service');
const genericRepository = require('./generic-repository');

module.exports = {
    getAll(options = {}) {
        let limit = (options.limit) ? 'limit ' + options.limit : '';
        let skip = (options.skip) ? 'offset ' + options.skip : '';
        let orderBy = (options.orderBy) ? options.orderBy : 'date_game';
        let orderDirection = (options.orderDirection) ? options.orderDirection : 'asc';

        let query = '';
 
        let sql = `select a.id, b.name as opponent, c.name as championship, 
        a.goals_my || 'x' || a.goals_opponent as result, a.date_game from main.game a 
        inner join main.opponent b on (a.opponent_id = b.id) 
        inner join main.championship c on (a.championship_id = c.id) 
        ${query} order by ${orderBy} ${orderDirection} ${skip} ${limit} `;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    }, 
    getMainInfo(gameId){
        let sql = `select b.name as opponent, c.name as championship, 
        a.phase, a.goals_my, a.goals_opponent, b.image_url as opponent_image, 
        a.date_game from main.game a 
        inner join main.opponent b on (a.opponent_id = b.id) 
        inner join main.championship c on (a.championship_id = c.id) 
        where a.id = ` + gameId;

        return databaseService.getFirstResult(sql);
    },
    getStatsByGameId(gameId){
        let sql = 'select * from main.game_stats where game_id = ' + gameId;

        return databaseService.getFirstResult(sql);
    },
    getById(id) {
        let sql = 'select id, opponent_id, championship_id, phase, goals_opponent, goals_my, ' + 
        'in_home, site, date_game from main.game where id = ' + id;

        return databaseService.getFirstResult(sql);
    }, 
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
            date_game = '${game.date_game}' 
            where id = ${game.id} RETURNING ID`;
        }
        else {
            sql = `insert into main.game (opponent_id, championship_id, phase, goals_opponent,
            goals_my, in_home, date_game) 
            values (${game.opponent_id}, ${game.championship_id}, '${game.phase}', ${game.goals_opponent},
            ${game.goals_my}, ${game.in_home}, '${game.date_game}') RETURNING ID`;
        }

        return databaseService.executeQuery(sql).then(data => {
            return data.rows[0].id;
        });
    },
    saveStats(gameStats){
        return genericRepository.save(gameStats, 'main.game_stats');
    },
};