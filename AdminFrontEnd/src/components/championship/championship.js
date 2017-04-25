import config from '../../config';

export default {
    data(){
        return {
            columnsTable: ['name', 'start_date', 'end_date', 'federation', 'options'],
            optionsTable: {
                perPage: 10,
                sortable: ['name', 'start_date', 'end_date', 'federation'],
                method: 'post',
                headers: {
                    'Authorization': this.$store.state.token
                },
                headings: {
                    name: 'Nome',
                    start_date: 'Date de Início',
                    end_date: 'Data Final',
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
        editChampionship(id){

        },
        newChampionship(){

        }
    }
}