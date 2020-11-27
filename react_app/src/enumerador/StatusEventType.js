var StatusEventType = {
    WAIT: {
        enumName: 'WAIT',        
        description: 'Aguardando Confirmação'        
    },
    CONFIRMED: {
        enumName: 'CONFIRMED',        
        description: 'Confirmado'        
    },
    REJECTED: {
        enumName: 'REJECTED',        
        description: 'Rejeitado'        
    },
    get(value) {        
        if (value === null || value === undefined || value === "undefined")
            return StatusEventType.WAIT;

        var array = Object.values(StatusEventType);
        var statusEventTypeFound = {};

        array.forEach(element => {            
            if(element.enumName === value) {
                statusEventTypeFound = element;      
                return ;          
            }            
        });   
        
        return statusEventTypeFound;
    },
    getAll() {
        var array = Object.values(StatusEventType);
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

export default StatusEventType;