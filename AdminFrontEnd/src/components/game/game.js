import config from '../../config';
import util from '../../services/util';

export default {
    data() {
        return {
            columnsTable: ['opponent', 'championship', 'result', 'date', 'options'],
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
                    date: 'Data',
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
        formatDate(value) {
            return util.formatDate(value, true);
        },
        newGame() {
            this.$router.push('/dash/edit-game/0');
        },
        stats(id){
            this.$router.push('/dash/stats/' + id);
        }
    }
}