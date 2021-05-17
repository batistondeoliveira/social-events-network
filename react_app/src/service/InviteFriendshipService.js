import Config from '../Config';
import RequestService from './RequestService';

class InviteFriendshipService {                   
    static async invite(email) {
        return RequestService.get(Config.urlApi + 'invite/friendship/' + email);
    }   
    
    static async replyInvitation(idUserFriendship, type) {
        return RequestService.patch(Config.urlApi + 'invite/friendship', {
            idUserFriendship: idUserFriendship,
            type: type
        });
    }   
}

export default InviteFriendshipService;