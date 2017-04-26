import federationService from '../../services/federation-service';

export default {
    created(){
        federationService.getAll()
        .then(federations => this.federations = federations)
        .then(() => {
            if (this.championship.id > 0){

            }
        });
    },
    data(){
        return {
            championship: {
                image_url: '',
                id: this.$route.params.id,
                site: '',
                federation_id: 0,
                name: '',
                format: 0,
                start_date: '',
                end_date: '',
                is_champion: false,
                final_position: 1,
                knockout_position: 1
            },
            federations: []
        }
    }
}