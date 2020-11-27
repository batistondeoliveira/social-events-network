import Config from '../Config';
import RequestService from './RequestService';

class InviteEventService {                   
    static async invite(idEvent, userList) {
        return RequestService.post(Config.urlApi + 'invite/event', {
            idEvent: idEvent,
            userList: userList
        });
    }
}

export default InviteEventService;