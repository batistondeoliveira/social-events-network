import InviteEventService from '../service/InviteEventService';
import InviteFriendshipService from '../service/InviteFriendshipService';

var NotificationType = {
    FRIENDSHIP: {
        enumName: 'FRIENDSHIP',        
        description: 'Convite de Amizade',        
        reply: function(item, status) {            
            return InviteFriendshipService.replyInvitation(            
                item.id_friendship,
                status
            );
        }
    },
    EVENT: {
        enumName: 'EVENT',        
        description: 'Convite para Evento',
        reply: function(item, status) {
            return InviteEventService.replyInvitation(            
                item.id_event,
                status
            );
        }          
    },
    get(value) {        
        if (value === null || value === undefined || value === "undefined")
            return NotificationType.FRIENDSHIP;

        var array = Object.values(NotificationType);
        var notificationTypeFound = {};

        array.forEach(element => {            
            if(element.enumName === value.toUpperCase()) {
                notificationTypeFound = element;      
                return ;          
            }            
        });   
        
        return notificationTypeFound;
    }
}

export default NotificationType;