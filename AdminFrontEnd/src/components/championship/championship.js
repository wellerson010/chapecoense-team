import config from '../../config';
import util from '../../services/util';

export default {
    data() {
        return {
            columnsTable: ['name', 'start-date', 'end-date', 'federation', 'options'],
            optionsTable: {
                perPage: 10,
                sortable: ['name', 'start-date', 'end-date', 'federation'],
                method: 'post',
                headers: {
                    'Authorization': this.$store.state.token
                },
                headings: {
                    name: 'Nome',
                    'start-date': 'Date de Início',
                    'end-date': 'Data Final',
                    federation: 'Federação',
                    options: 'Opções'
                },
                texts: {
                    filter: '',
                    filterPlaceholder: 'Buscar por nome ou federação'
                },
            },
            urlGetChampionship: config.serverURI + '/championship/get-all-to-vue-tables'
        }
    },
    methods: {
        editChampionship(id) {
            this.$router.push('/dash/edit-championship/' + id);
        },
        formatDate(value) {
            return util.formatDate(value);
        },
        newChampionship() {
            this.$router.push('/dash/edit-championship/0');
        }
    }
}