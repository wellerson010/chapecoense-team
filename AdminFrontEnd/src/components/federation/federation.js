import federationService from '../../services/federation-service';

export default {
    data: function () {
        return {
            columns: ['name', 'options'],
            federations: [],
            optionsTable: {
                perPage: 50,
                sortable: ['name'],
                filterable: false,
                headings: {
                    name: 'Nome',
                    options: 'Opções',
                }
            }
        }
    },
    created: function () {
        this.getFederations();
    },
    methods: {
        editFederation(id) {
            this.$router.push('/dash/edit-federation/' + id);
        },
        getFederations() {
            federationService.getAll().then(federations => {
                this.federations = federations;
            });
        },
        newFederation(){
             this.$router.push('/dash/edit-federation/0');
        }
    }
}