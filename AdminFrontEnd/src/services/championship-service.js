import apiService from './api-service';


export default {
    get(id) {
        let url = '/championship/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    save(player){
        let url = '/championship/save';
        
        return apiService.request(url, 'post', player);
    }
}