import Config from '../Config';
import RequestService from './RequestService';

class UserService {               
    static async save(data) {                
        return RequestService.post(Config.urlApi + 'user', data);
    }          
    
    static async login(email, password) {        
        return RequestService.post(Config.urlApi + 'user/login', {                      
            email: email,
            password: password
        });
    }
}

export default UserService;