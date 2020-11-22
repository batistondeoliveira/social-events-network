import axios from 'axios';
import AuthenticateService from "./AuthenticateService";

class RequestService {
    constructor(urlBase) {
        this.urlBase = urlBase !== undefined ? urlBase  : '';
    }

    static headers(config) {
        if(config === undefined) {
            config = {headers: {}};
        }

        if(config.headers === undefined) {
            config.headers = {};
        }

        config.headers['X-Token'] = AuthenticateService.getToken();

        return config;
    }

    static async get(url, config) {
        return axios.get(url, RequestService.headers(config));
    }

    static async post(url, data, config) {
        return axios.post(url, data, RequestService.headers(config));
    }

    static async delete(url, config) {
        return axios.delete(url, RequestService.headers(config));
    }
}

export default RequestService;