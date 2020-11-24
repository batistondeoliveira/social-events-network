import React from 'react';

class AbstractComponent extends React.Component {         
    standardError() {
        return 'Ocorreu um erro inesperado, tente novamente mais tarde!';
    }

    handlingError(error) {        
        let errorTxt = '';        
                
        if((error === undefined || error.response === undefined || error.response.data === undefined || error.response.data === '')) {                    
            errorTxt = this.standardError();

            return errorTxt;
        }        
                
        errorTxt = error.response.data;        

        if((errorTxt === '')||(errorTxt === undefined))
            return this.standardError();

        let pos = errorTxt.indexOf('"');                                

        if(pos === -1)
            return errorTxt;
            
        if(pos === 0)            
            errorTxt = errorTxt.substring(1, errorTxt.length);        
            
        pos = errorTxt.indexOf('"');                    
        
        if(pos > -1)
            errorTxt = errorTxt.substring(0, pos);                
            
        return errorTxt;
    }      

    addZero(number) {
        if(number <= 9)
            return '0' + number;

        return number;
    }

    dateFormat(date) {
        let dateFormat = new Date(date);
        
        return this.addZero(dateFormat.getDate()) + '/' + this.addZero(dateFormat.getMonth() + 1) + '/' + dateFormat.getFullYear();        
    }
}

export default AbstractComponent;