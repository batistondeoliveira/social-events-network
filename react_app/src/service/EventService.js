import Config from '../Config';
import RequestService from './RequestService';

class EventService {                   
    static async save(data) {                
        return RequestService.post(Config.urlApi + 'event', data);
    }              

    static async cancelar(id) {                
        return RequestService.get(Config.urlApi + 'event/' + id);
    } 

    static async list(filters, page) {                
        return RequestService.post(Config.urlApi + 'event/list', {
            filters: filters,
            page: page
        });
    } 
    
    static async placeList() {                
        return RequestService.get(Config.urlApi + 'event/place/list');
    }

    static async getById(id) {                
        return RequestService.get(Config.urlApi + 'event/detail/' + id);
    } 

    static async getMyEvents(filters) {                 
        return RequestService.post(Config.urlApi + 'event/mylist', {
            filters: filters
        });
    }
}

export default EventService;