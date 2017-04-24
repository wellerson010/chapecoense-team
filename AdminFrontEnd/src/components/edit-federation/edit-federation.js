import alertService from '../../services/alert-service';
import federationService from '../../services/federation-service';

export default {
    created() {
        if (this.federation.id > 0) {
            federationService.get(this.federation.id).then(federation => {
                this.federation = federation;
            });
        }
    },
    data() {
        return {
            federation: {
                site: '',
                image_url: '',
                name: '',
                id: this.$route.params.id,
            }
        }
    },
    methods: {
        cancel() {
            alertService.confirm('Deseja mesmo cancelar as alterações?').then(ok => {
                if (ok) {
                    this.$router.push('/dash/federation');
                }
            });
        },
        save() {
            if (!this.federation.name || this.federation.name.trim() == '') {
                alertService.alert('Por favor, escreva o nome da federação!');
                return;
            }

             federationService.save(this.federation).then(data => {
                this.$router.push('/dash/federation');
            }); 
        }
    }
}