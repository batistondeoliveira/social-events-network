import React from 'react';

import AuthenticateService from '../service/AuthenticateService';
import UserService from '../service/UserService';

import { route } from '../functions/Route';

class AbstractComponent extends React.Component {         
    standardError() {
        return 'Ocorreu um erro inesperado, tente novamente mais tarde!';
    }

    is401Error(error) {
        if(error.response === undefined)
            return false;
            
        if(error.response.status === undefined) 
            return false;

        if(error.response.status !== 401)                      
            return false;

        return true;
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

    addMenu(icone, nome, link) {
        let menu = {};

        menu.icone = icone;
        menu.nome = nome;
        menu.link = link;

        return menu;
    }

    addZero(number) {
        if(number <= 9)
            return '0' + number;

        return number;
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
        window.location.href = '/login';
    }

    goAdminArea() {
        return route('', '', '/admin');   
    }    

    homePage() {        
        window.location.href = '/';
    } 

    homePage2() {        
        return route('', '', '/');   
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