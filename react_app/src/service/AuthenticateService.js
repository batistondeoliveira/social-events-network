class AuthenticateService {    
    static login(token, email, userName) {
        localStorage.setItem('x-token', token);
        localStorage.setItem('email', email);  
        localStorage.setItem('userName', userName);

        window.location.href = '/admin';
    }

    static getToken() {            
        return localStorage.getItem('x-token');
    } 
    
    static getEmail() {            
        return localStorage.getItem('email');
    } 

    static getUserName() {            
        return localStorage.getItem('userName');
    } 

    static logout() {                    
        localStorage.removeItem('x-token');
        localStorage.removeItem('x-email');        
        localStorage.removeItem('userName'); 
        
        window.location.href = '/';
    }    
}

export default AuthenticateService;