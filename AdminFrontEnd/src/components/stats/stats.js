import gameService from '../../services/game-service';
import statsPlayer from '../stats-player/stats-player.vue';
import statsGame from '../stats-game/stats-game.vue';
import utilService from '../../services/util';

export default {
    created() {
        gameService.getMainInfo(this.gameId).then(data => {
            this.game = data;
        });
    },
    components: { statsPlayer, statsGame },
    data: function () {
        return {
            game: {
                opponent: '',
                championship: '',
                phase: '',
                goals_my: 0,
                goals_opponent: 0,
                date_game: '',
                opponent_image: ''
            },
            gameId: this.$route.params.id,
            toShowGame: true,
            toShowPlayer: false
        }
    },
    methods: {
        formatDate: function(value){
            return utilService.formatDate(value, true);
        },
        showWindow: function (type) {
            if (type == 'game') {
                this.toShowPlayer = false;
                this.toShowGame = true;
            }
            else {
                this.toShowGame = false;
                this.toShowPlayer = true;
            }
        }
    }
}