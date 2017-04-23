import alertService from '../../services/alert-service';
import playerService from '../../services/player-service';
import positionService from '../../services/position-service';

export default {
    computed: {
        secondary_positions() {
            let positions = [];

            for (let p of this.player.pos_sec) {
                let position = this.positions.find(data => data.id == p);
                positions.push(position);
            }
            return positions;
        }
    },
    created() {
        positionService.getAll().then(positions => {
            this.positions = positions;
        }).then(() => {
            if (this.id > 0) {
                playerService.getPlayer(this.id).then(data => {
                    this.player = data;
                });
            }
        });
    },
    data() {
        return {
            id: this.$route.params.id,
            player: {
                id: this.$route.params.id,
                image_url: '',
                pos_sec: [],
                in_team: true,
                main_position_id: 0,
                psn: '',
                name: ''
            },
            positions: [],
            selectedSecondaryPositionToAdd: 0
        }
    },
    methods: {
        addPositionSecundary() {
            if (this.selectedSecondaryPositionToAdd == this.player.main_position_id) {
                alertService.alert('Essa posição já é a posição principal do jogador!');
                return;
            }

            if (this.player.pos_sec.filter(data => data == this.selectedSecondaryPositionToAdd).length > 0) {
                alertService.alert('Essa posição já está adicionada!');
                return;
            }

            if (this.selectedSecondaryPositionToAdd > 0) {
                this.player.pos_sec.push(this.selectedSecondaryPositionToAdd);
            }
        },
        cancel() {
            alertService.confirm('Deseja mesmo cancelar as alterações?').then(ok => {
                if (ok) {
                    this.$router.push('/dash/players');
                }
            });
        },
        deletePositionSecundary(event) {
            let positionId = event.target.value;

            this.player.pos_sec = this.player.pos_sec.filter(data => data != positionId);
        },
        save() {
            this.$store.commit('TOGGLE_LOADING')
          /*  if (!this.player.name || this.player.name.trim() == '') {
                alertService.alert('Por favor, escreva o nome do jogador!');
                return;
            }
            if (this.player.main_position_id == 0) {
                alertService.alert('Por favor, selecione a posição principal do jogador!');
                return;
            }
            playerService.save(this.player).then(data => {
                this.$router.push('/dash/players');
            }); */
        }
    }
}