import config from '../../config';

export default {
    data: function(){
        return {
            columnsTable: ['name', 'options'],
            optionsTable: {
                perPage: 10,
                sortable: ['name'],
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
                    filterPlaceholder: 'Buscar por nome'
                },
            },
            urlGetOpponent: config.serverURI + '/opponent/get-all-to-vue-tables'
        }
    },
    methods: {
        editOpponent(id){
            this.$router.push('/dash/edit-opponent/' + id);
        },
        newOpponent(){
            this.$router.push('/dash/edit-opponent/0');
        }
    }
}