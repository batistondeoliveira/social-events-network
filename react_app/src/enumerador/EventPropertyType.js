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
    },
    getAll() {
        var array = Object.values(EventPropertyType);
        var result = [{value: 0, description: 'Selecione'}];        

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

export default EventPropertyType;