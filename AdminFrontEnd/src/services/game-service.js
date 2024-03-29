import apiService from './api-service';

export default {
    get(id) {
        let url = '/game/get/' + id;
        return apiService.request(url).then(response => response.data);
    },
    getMainInfo(gameId) {
        let url = '/game/main-info/' + gameId;
        return apiService.request(url).then(response => response.data);
    },
    getStats(gameId) {
        let url = '/game/get-stats/' + gameId;
        return apiService.request(url).then(response => response.data);
    },
    save(federation) {
        let url = '/game/save';

        return apiService.request(url, 'post', federation).then(response => response.data);
    }
}