import playerService from '../../services/player-service';

export default {
    name: 'Squad',
    data: function () {
        return {
            columns: ['photo', 'position', 'name', 'psn', 'erase'],
            squad: [],
            options: {
                perPage: 50,
                sortable: ['name', 'psn', 'position'],
                filterable: false,
            }
        }
    },
    created: function () {
        this.getSquad();
    },
    methods: {
        getSquad: function () {
            playerService.getSquad().then(squad => {
                this.squad = squad;
            });
        },
        removeFromSquad: function(id){
            playerService.deleteFromSquad(id).then(data => {
                if (data){
                    this.squad = this.squad.filter(data => data.id != id);
                }
            });
        }
    }
}