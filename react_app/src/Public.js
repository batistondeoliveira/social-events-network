import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './component/user/Register';

import './css/Style.css'
class Public extends React.Component {
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
                </Switch>
            </BrowserRouter>   
        )
    }
}

export default Public;