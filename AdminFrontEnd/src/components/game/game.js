import config from '../../config';

export default {
    data() {
        return {
            columnsTable: ['opponent', 'championship', 'result', 'date_game', 'options'],
            optionsTable: {
                perPage: 10,
                //   sortable: ['name'],
                method: 'post',
                headers: {
                    'Authorization': this.$store.state.token
                },
                headings: {
                    name: 'Nome',
                    options: 'Opções',
                },
                texts: {
                    filter: '',
                    filterPlaceholder: 'Buscar por time ou campeonato'
                },
            },
            urlGetGame: config.serverURI + '/game/get-all-to-vue-tables'
        }
    },
    methods: {
        editGame(id) {
            this.$router.push('/dash/edit-game/' + id);
        },
        newGame() {
            this.$router.push('/dash/edit-game/0');
        }
    }
}