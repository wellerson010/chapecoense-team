import apiService from './api-service';

export default {
    get(id) {
        let url = '/opponent/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    save(opponent){
        let url = '/opponent/save';

        return apiService.request(url, 'post', opponent).then(response => response.data);
    }
}