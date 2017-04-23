import apiService from './api-service';

let positionsCache;

export default {
    getAll: () => {
        if (positionsCache){
            console.log('CACHE');
            return Promise.resolve(positionsCache);
        }
        else{
            let url = '/position/all';
            return apiService.request(url).then(response => {
                positionsCache = response.data;
                return positionsCache;
            });
        }
    }
}