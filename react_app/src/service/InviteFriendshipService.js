import Config from '../Config';
import RequestService from './RequestService';

class InviteFriendshipService {                   
    static async invite(email) {
        return RequestService.get(Config.urlApi + 'invite/friendship/' + email);
    }    
}

export default InviteFriendshipService;