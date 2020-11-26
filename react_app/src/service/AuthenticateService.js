class AuthenticateService {    
    static login(token, email) {
        localStorage.setItem('x-token', token);
        localStorage.setItem('email', email);            

        window.location.href = '/admin';
    }

    static getToken() {            
        return localStorage.getItem('x-token');
    } 
    
    static getEmail() {            
        return localStorage.getItem('email');
    } 

    static logout() {                    
        localStorage.removeItem('x-token');
        localStorage.removeItem('x-email');        
    }    
}

export default AuthenticateService;