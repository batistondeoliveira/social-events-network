import Config from '../Config';
import RequestService from './RequestService';

class EventService {                   
    static async save(data) {                
        return RequestService.post(Config.urlApi + 'event', data);
    }              

    static async cancelar(id) {                
        return RequestService.get(Config.urlApi + 'event/' + id);
    } 

    static async list(filter) {                
        return RequestService.post(Config.urlApi + 'event/list', {
            filter: filter
        });
    } 
    
    static async placeList() {                
        return RequestService.get(Config.urlApi + 'event/place/list');
    }

    static async getById(id) {                
        return RequestService.get(Config.urlApi + 'event/detail/' + id);
    } 

    static async getMyEvents() {            
        return RequestService.get(Config.urlApi + 'event');
    }
}

export default EventService;