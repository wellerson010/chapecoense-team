import api from './api-service';
import alertService from './alert-service';

export default {
    deleteFromSquad: (id) => {
        let url = '/players/delete-from-squad';

        let data = {
            id: id
        };

        return alertService.confirm('Deseja mesmo remover este jogador do elenco?').then(confirm => {
            if (confirm) {
                return api.request(url, 'delete', data).then(response => {
                    return response.data;
                });
            }
        });
    },
    getPlayer: (id) => {
        let url = '/players/edit/' + id;

        return api.request(url).then(response => {
            return response.data;
        });
    },
    getSquad(){
        let url = '/players/squad';
        
        return api.request(url).then(response => {
            return response.data;
        });
    },
    save(player){
        let url = '/players/save';
        
        return api.request(url, 'post', player);
    }
}