import statsPlayer from '../stats-player/stats-player.vue';
import statsGame from '../stats-game/stats-game.vue';

export default {
    components: { statsPlayer, statsGame },
    data: function () {
        return {
            toShowGame: true,
            toShowPlayer: false
        }
    },
    methods: {
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