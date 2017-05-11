import gameService from '../../services/game-service';

export default {
    created() {
        this.stats.game_id = this.game_id;

        gameService.getStats(this.gameId).then(data => {
            if (data) {
                this.stats = data;
            }
        });
    },
    data() {
        return {
            stats: {
                id: 0,
                game_id: 0,
                my_shots: 0,
                opponent_shots: 0,
                my_shots_target: 0,
                opponent_shots_target: 0,
                my_possession: 0,
                opponent_possession: 0,
                my_tackles: 0,
                opponent_tackles: 0,
                my_fouls: 0,
                opponent_fouls: 0,
                my_yellow_cards: 0,
                opponent_yellow_cards: 0,
                my_red_cards: 0,
                opponent_red_cards: 0,
                my_offsides: 0,
                opponent_offsides: 0,
                my_corners: 0,
                opponent_corners: 0,
                my_shot_accuracy: 0,
                opponent_shot_accuracy: 0,
                my_pass_accuracy: 0,
                opponent_pass_accuracy: 0
            }
        }
    },
    props: {
        gameId: {
            default: 0
        }
    }
}