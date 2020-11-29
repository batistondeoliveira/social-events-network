var NotificationType = {
    FRIENDSHIP: {
        enumName: 'FRIENDSHIP',        
        description: 'Convite de Amizade'        
    },
    EVENT: {
        enumName: 'EVENT',        
        description: 'Convite para Evento'        
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