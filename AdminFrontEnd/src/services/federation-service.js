import apiService from './api-service';

export default {
    get(id) {
        let url = '/federation/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    getAll(){
         let url = '/federation/all';
        return apiService.request(url).then(response => response.data);
    },
    save(federation){
        let url = '/federation/save';

        return apiService.request(url, 'post', federation).then(response => response.data);
    }
}