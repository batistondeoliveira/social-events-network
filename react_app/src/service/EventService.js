import Config from '../Config';
import RequestService from './RequestService';

class EventService {               
    static async save(data) {                
        return RequestService.post(Config.urlApi + 'event', data);
    }              

    static async list() {                
        return RequestService.get(Config.urlApi + 'event/list');
    }              
}

export default EventService;