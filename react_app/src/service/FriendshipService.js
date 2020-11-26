import Config from '../Config';
import RequestService from './RequestService';

class FriendshipService {               
    static async list() {                
        return RequestService.get(Config.urlApi + 'friendship');
    }           
    
    static async undoFriendship(idUser, type) {
        return RequestService.post(Config.urlApi + 'friendship/undo', {
            idUser: idUser,
            type: type
        });
    }    
}

export default FriendshipService;