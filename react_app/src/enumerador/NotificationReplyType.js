var NotificationReplyType = {
    CONFIRMED: {
        enumName: 'CONFIRMED',        
        description: 'Confirmar',        
    },
    REJECTED: {
        enumName: 'REJECTED',        
        description: 'Rejeitar'
    },
    get(value) {        
        if (value === null || value === undefined || value === "undefined")
            return NotificationReplyType.FRIENDSHIP;

        var array = Object.values(NotificationReplyType);
        var notificationReplyTypeFound = {};

        array.forEach(element => {            
            if(element.enumName === value.toUpperCase()) {
                notificationReplyTypeFound = element;      
                return ;          
            }            
        });   
        
        return notificationReplyTypeFound;
    },
    getAll() {
        var array = Object.values(NotificationReplyType);
        var result = [];                        

        array.forEach(element => {                                                
            if(element.enumName === undefined) 
                return;                        

            result.push({
                value: element.enumName, 
                description: element.description, 
                selected: false
            })            
        }); 

        return result;
    }
}

export default NotificationReplyType;