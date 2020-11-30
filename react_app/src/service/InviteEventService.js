import Config from '../Config';
import RequestService from './RequestService';

class InviteEventService {                   
    static async invite(idEvent, userList) {
        return RequestService.post(Config.urlApi + 'invite/event', {
            idEvent: idEvent,
            userList: userList
        });
    }

    static async replyInvitation(idEvent, status) {
        return RequestService.patch(Config.urlApi + 'invite/event', {                      
            idEvent: idEvent,
            status: status
        });        
    }
}

export default InviteEventService;