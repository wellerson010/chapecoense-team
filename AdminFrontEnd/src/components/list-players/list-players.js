import config from '../../config';

export default {
    data: function(){
        return {
            columns: [],
            optionsTable: {
                perPage: 65,
                method: 'post',
                headers: {
                    'Authorization': this.$store.state.token
                }
            },
            urlGetPlayers: config.serverURI + '/players/get-players-to-vue-tables'
        }
    }
}