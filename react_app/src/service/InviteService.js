import Config from '../Config';
import RequestService from './RequestService';

class InviteService {                   
    static async invite(email) {
        return RequestService.get(Config.urlApi + 'invite/' + email);
    }
}

export default InviteService;