export default {
    created(){
        if (this.game.id > 0){

        }
    },
    data(){
        return {
            game: {
                id: this.$route.params.id,
                opponent_id: 0,
                championship_id: 0,
                phase: '',
                goals_opponent: 0,
                goals_my: 0,
                in_home: false,
                date_game: new Date()
            }
        }
    }
}