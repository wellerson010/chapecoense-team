import config from '../../config';

export default {
    data: function(){
        return {
            columnsTable: ['name', 'psn', 'in_team', 'position', 'options'],
            optionsTable: {
                perPage: 10,
                sortable: ['name', 'psn', 'position'],
                method: 'post',
                headers: {
                    'Authorization': this.$store.state.token
                },
                headings: {
                    name: 'Nome',
                    psn: 'PSN',
                    in_team: 'Elenco?',
                    options: 'Opções',
                    position: 'Posição'
                },
                texts: {
                    filter: '',
                    filterPlaceholder: 'Buscar por nome ou PSN'
                },
            },
            urlGetPlayers: config.serverURI + '/players/get-players-to-vue-tables'
        }
    },
    methods: {
        editPlayer(id){
            this.$router.push('/dash/edit-player/' + id);
        },
        newPlayer(){
            this.$router.push('/dash/edit-player/0');
        }
    }
}