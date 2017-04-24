import alertService from '../../services/alert-service';
import opponentService from '../../services/opponent-service';

export default {
    created() {
        if (this.opponent.id > 0) {
            opponentService.get(this.opponent.id).then(opponent => {
                this.opponent = opponent;
            });
        }
    },
    data() {
        return {
            opponent: {
                facebook: '',
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
                    this.$router.push('/dash/opponent');
                }
            });
        },
        save() {
            if (!this.opponent.name || this.opponent.name.trim() == '') {
                alertService.alert('Por favor, escreva o nome do time!');
                return;
            }

             opponentService.save(this.opponent).then(data => {
                this.$router.push('/dash/opponent');
            }); 
        }
    }
}