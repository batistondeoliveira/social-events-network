var EventPropertyType = {
    OWNER: {
        enumName: 'OWNER',        
        description: 'Proprietário'        
    },
    GUEST: {
        enumName: 'GUEST',        
        description: 'Convidado'        
    },
    get(value) {        
        if (value === null || value === undefined || value === "undefined")
            return EventPropertyType.OWNER;

        var array = Object.values(EventPropertyType);
        var eventPropertyTypeFound = {};

        array.forEach(element => {            
            if(element.enumName === value) {
                eventPropertyTypeFound = element;      
                return ;          
            }            
        });   
        
        return eventPropertyTypeFound;
    }
}

export default EventPropertyType;