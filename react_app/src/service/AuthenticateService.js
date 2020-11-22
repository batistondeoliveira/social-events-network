class AuthenticateService {    
    static login(token) {
        localStorage.setItem('x-token', token);                
        
        window.location.href = '/admin';
    }

    static getToken() {            
        return localStorage.getItem('x-token');
    }    

    static logout() {                    
        localStorage.removeItem('x-token');           

        window.location.href = '/';
    }    
}

export default AuthenticateService;