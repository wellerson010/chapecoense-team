import squadView from '../squad/squad.vue';
import listPlayerView from '../list-players/list-players.vue';

export default {
    name: 'Players',
    components: { squadView, listPlayerView },
    data: function () {
        return {
            toShowSquad: true,
            toShowPlayer: false
        }
    },
    methods: {
        showWindow: function (type) {
            if (type == 'squad') {
                this.toShowPlayer = false;
                this.toShowSquad = true;
            }
            else {
                this.toShowSquad = false;
                this.toShowPlayer = true;
            }
        }
    }
}