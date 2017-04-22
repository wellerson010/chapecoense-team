const databaseService = require('../services/database-service');

module.exports = {
    deleteFromSquad: (id) => {
        let sql = `update main.player set in_team = false where id = ` + id;

        return databaseService.executeQuery(sql).then(data => {
            return data.rowCount;
        });
    },
    getSquad: () => {
        let sql = `select player.name, player.id, player.image_url, player.psn, position.short_name as position from main.player player
        inner join main.position position on (position.id = player.main_position_id)
        where player.in_team = true order by player.name`;

        return databaseService.executeQuery(sql).then(data => {
            return data.rows;
        });
    }
}