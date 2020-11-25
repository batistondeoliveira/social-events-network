import Config from '../Config';
import RequestService from './RequestService';

class FriendshipService {               
    static async list() {                
        return RequestService.get(Config.urlApi + 'friend');
    }              
}

export default FriendshipService;