import playerService from '../../services/player-service';

export default {
    name: 'Squad',
    data: function () {
        return {
            columns: ['name', 'psn', 'position', 'options'],
            squad: [],
            optionsTable: {
                perPage: 50,
                sortable: ['name', 'psn', 'position'],
                filterable: false,
                headings: {
                    name: 'Nome',
                    psn: 'PSN',
                    options: 'Opções',
                    position: 'Posição'
                }
            }
        }
    },
    created: function () {
        this.getSquad();
    },
    methods: {
        editPlayer(id) {
            this.$router.push('/dash/edit-player/' + id);
        },
        getSquad() {
            playerService.getSquad().then(squad => {
                this.squad = squad;
            });
        },
        removeFromSquad(id) {
            playerService.deleteFromSquad(id).then(data => {
                if (data) {
                    this.squad = this.squad.filter(data => data.id != id);
                }
            });
        }
    }
}