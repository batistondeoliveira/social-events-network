import Config from '../Config';
import RequestService from './RequestService';

class UserService {               
    static async save(data) {                
        return RequestService.post(Config.urlApi + 'user', data);
    }      
}

export default UserService;