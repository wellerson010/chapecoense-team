import apiService from './api-service';

export default {
    save(federation){
        let url = '/game/save';

        return apiService.request(url, 'post', federation).then(response => response.data);
    }
}