class AuthenticateService {    
    static login(token, email, userName, profilePicture) {
        localStorage.setItem('x-token', token);
        localStorage.setItem('email', email);  
        localStorage.setItem('userName', userName);
        localStorage.setItem('profilePicture', profilePicture);

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

    static getProfilePicture() {            
        return localStorage.getItem('profilePicture');
    }

    static logout() {                    
        localStorage.removeItem('x-token');
        localStorage.removeItem('email');        
        localStorage.removeItem('userName'); 
        localStorage.removeItem('profilePicture'); 
        
        window.location.href = '/';
    }    
}

export default AuthenticateService;