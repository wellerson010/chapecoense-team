import apiService from './api-service';

let positionsCache;

export default {
    get(id) {
        let url = '/position/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    getAll(ignoreCache = false) {
        if (positionsCache && !ignoreCache) {
            return Promise.resolve(positionsCache);
        }
        else {
            let url = '/position/all';
            return apiService.request(url).then(response => {
                positionsCache = response.data;
                return positionsCache;
            });
        }
    },
    save(position){
        let url = '/position/save';

        return apiService.request(url, 'post', position).then(response => response.data);
    }
}