import apiService from './api-service';

let opponentsCache;

export default {
    get(id) {
        let url = '/opponent/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    getListCache() {
        if (opponentsCache) {
            return Promise.resolve(opponentsCache);
        }
        else {
            let url = '/opponent/all';
            return apiService.request(url).then(response => {
                opponentsCache = response.data;
                return opponentsCache;
            });
        }
    },
    save(opponent) {
        let url = '/opponent/save';

        return apiService.request(url, 'post', opponent).then(response => {
            opponentsCache = null;
            return response.data;
        });
    }
}