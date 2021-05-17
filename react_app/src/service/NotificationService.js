import Config from '../Config';
import RequestService from './RequestService';

class NotificationService {               
    static async notification() {                
        return RequestService.get(Config.urlApi + 'notification');
    }              
}

export default NotificationService;