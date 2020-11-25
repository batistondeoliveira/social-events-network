import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyEvents from './component/event/MyEvents';
import NotFound from './component/layout/notfound/NotFound';
import Login from './component/login/Login';
import Register from './component/user/Register';

import './css/Style.css'

class Admin extends React.Component {        
    render() {
        return (
            <BrowserRouter ref={(ref) => this.browserRoute =  ref}>
                <Switch>   
                    <Route 
                        exact 
                        path='/admin'
                        render={props => 
                            <MyEvents
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

                    <Route path="*" component={NotFound}/>                                                     
                </Switch>
            </BrowserRouter>  
        )
    }
}

export default Admin;