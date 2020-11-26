import React from 'react';

import AuthenticateService from '../service/AuthenticateService';
import UserService from '../service/UserService';

import { route } from '../functions/Route';

class AbstractComponent extends React.Component {         
    standardError() {
        return 'Ocorreu um erro inesperado, tente novamente mais tarde!';
    }

    is401Error(error) {
        if(error.response.status === 401)                      
            return true;

        return false;
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

    getUrl(controller, index) {
        var url = window.location.href;

        var indexAux = (url.indexOf(controller) + controller.length + 1);

        var strResult = url.substring(indexAux, url.length);        

        var array = strResult.split('/');
        
        if(!Array.isArray(array))
            return array;

        return array[index];            
    }

    isAdmin() {
        if(AuthenticateService.getToken() === undefined)
            return false;
        
        if(AuthenticateService.getToken() === '')
            return false;
        
        if(AuthenticateService.getToken() === null)
            return false;

        if(AuthenticateService.getEmail() === undefined)
            return false;
        
        if(AuthenticateService.getEmail() === '')
            return false;
        
        if(AuthenticateService.getEmail() === null)
            return false;

        return true;
    }

    goLoginArea() {
        return route('', '', '/login');   
    }

    goAdminArea() {
        return route('', '', '/admin');   
    }    

    homePage() {        
        window.location.href = '/';
    } 

    logout() {        
        UserService.logout().then(() => {            
            AuthenticateService.logout();
            
            this.setState({preload: false});

            this.homePage();                    
        }).catch(() => {                
            AuthenticateService.logout();                               
        });
    }
}

export default AbstractComponent;