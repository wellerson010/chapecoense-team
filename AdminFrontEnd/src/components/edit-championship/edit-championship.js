import championshipService from '../../services/championship-service';
import federationService from '../../services/federation-service';
import datePicker from 'vuejs-datepicker';

export default {
    components: {
        datePicker
    },
    created(){
        federationService.getAll()
        .then(federations => this.federations = federations)
        .then(() => {
            if (this.championship.id > 0){
                championshipService.get(this.championship.id).then(championship => this.championship = championship);
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
                start_date: new Date(),
                end_date: new Date(),
                is_champion: false,
                final_position: 0,
                knockout_position: 0
            },
            federations: []
        }
    },
    methods: {
        cancel(){
            this.$router.push('/dash/championship');
        },
        save(){
            championshipService.save(this.championship).then(() => {
                this.$router.push('/dash/championship');
            });
        }
    }
}