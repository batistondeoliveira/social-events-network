var StatusEventType = {
    WAIT: {
        enumName: 'WAIT',        
        description: 'Aguardando Confirmação',
        toReply: '',        
    },
    CONFIRMED: {
        enumName: 'CONFIRMED',        
        description: 'Confirmado',
        toReply: 'Confirmar',
    },
    REJECTED: {
        enumName: 'REJECTED',        
        description: 'Rejeitado',
        toReply: 'Rejeitar'
    },
    get(value) {        
        if (value === null || value === undefined || value === "undefined")
            return StatusEventType.WAIT;

        var array = Object.values(StatusEventType);
        var statusEventTypeFound = {};

        array.forEach(element => {            
            if(element.enumName === value.toUpperCase()) {
                statusEventTypeFound = element;      
                return ;          
            }            
        });   
        
        return statusEventTypeFound;
    },
    getAll(from = -1) {
        var array = Object.values(StatusEventType);
        var result = [];        

        if(from === -1)
            result.push({
                value: 0, 
                description: 'Selecione', 
                selected: false
            });

        var index = -1;

        array.forEach(element => {            
            index++;

            if(element.enumName === undefined) 
                return;            

            if(index < from)
                return ;

            result.push({
                value: element.enumName, 
                description: (from === -1 ? element.description : element.toReply),
                selected: false
            })            
        }); 

        return result;
    }
}

export default StatusEventType;