import gameService from '../../services/game-service';
import opponentService from '../../services/opponent-service';
import championshipService from '../../services/championship-service';
import util from '../../services/util';

export default {
    created() {
        opponentService.getListCache().then(opponent => {
            this.opponents = opponent;

            championshipService.getListCache().then(championships => {
                this.championships = championships;

                if (this.game.id > 0) {
                    gameService.get(this.game.id).then(game => {
                        this.game = game;

                        this.game.date_game = util.formatDate(this.game.date_game, true, {
                            hideTrace: true
                        });
                    });
                }
            });
        });
    },
    data() {
        return {
            game: {
                id: this.$route.params.id,
                opponent_id: 0,
                championship_id: 0,
                phase: '',
                goals_opponent: 0,
                goals_my: 0,
                in_home: false,
                date_game: '',
                site: ''
            },
            championships: [],
            opponents: []
        }
    },
    methods: {
        cancel() {
            this.$router.push('/dash/game');
        },
        save() {
            gameService.save(this.game).then(data => {
                this.$router.push('/dash/game');
            });
        }
    }
}