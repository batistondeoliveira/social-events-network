import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './component/layout/notfound/NotFound';
import Register from './component/user/Register';
import Login from './component/login/Login';
import Admin from './Admin';

import AuthenticateService from './service/AuthenticateService';

import './css/Style.css'
class Public extends React.Component {
    admin() {
        if(AuthenticateService.getToken() === undefined)
            return
        
        if(AuthenticateService.getToken() === '')
            return ;
        
        if(AuthenticateService.getToken() === null)
            return ;

        return (
            <Route 
                    exact 
                    path='/admin'
                    render={props => 
                        <Admin
                            {...props}
                                
                            route={(item) => this.browserRoute.history.push(item.link)}
                        />
                    }
                />
        );
    }

    render() {
        return (
            <BrowserRouter ref={(ref) => this.browserRoute =  ref}>
                <Switch>                                                             
                    <Route 
                        exact 
                        path='/register'
                        render={props => 
                            <Register
                                {...props}
                                    
                                route={(item) => this.browserRoute.history.push(item.link)}
                            />
                        }
                    />  

                    <Route 
                        exact 
                        path='/login'
                        render={props => 
                            <Login
                                {...props}
                                    
                                route={(item) => this.browserRoute.history.push(item.link)}
                            />
                        }
                    />   

                    { this.admin() }

                    <Route path="*" component={NotFound}/>                                                     
                </Switch>
            </BrowserRouter>   
        )
    }
}

export default Public;