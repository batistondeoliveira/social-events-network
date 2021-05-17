import Config from '../Config';
import RequestService from './RequestService';

class BadgeService {               
    static async badge() {                
        return RequestService.get(Config.urlApi + 'badge');
    }              
}

export default BadgeService;