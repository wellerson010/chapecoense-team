import axios from 'axios'
import config from '../config'
import store from '../store';

export default {
  request (uri, method = 'get', data = null) {
    if (!uri) {
      console.error('API function call requires uri argument');
      return;
    }
    
    let url = config.serverURI + uri;

    let params = {
      method, url, data
    }

    if (store.state.token){
      params['headers'] = {
        Authorization: store.state.token
      };
    }

    return axios(params);
  }
}
