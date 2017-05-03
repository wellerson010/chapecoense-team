import apiService from './api-service';

let championshipsCache;

export default {

    get(id) {
        let url = '/championship/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    getListCache() {
        if (championshipsCache) {
            return Promise.resolve(championshipsCache);
        }
        else {
            let url = '/championship/get';
            return apiService.request(url).then(response => {
                championshipsCache = response.data;
                return championshipsCache;
            });
        }
    },
    save(player) {
        let url = '/championship/save';

        return apiService.request(url, 'post', player).then(data => {
            championshipsCache = null;
        });
    }
}