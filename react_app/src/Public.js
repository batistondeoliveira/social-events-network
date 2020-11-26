import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AbstractComponent from './component/AbstractComponent';
import NotFound from './component/layout/notfound/NotFound';
import Register from './component/user/Register';
import Login from './component/login/Login';
import EventList from './component/event/List';
import EventDetail from './component/event/Detail';
import TopNav from './component/layout/nav/TopNav';
import Admin from './Admin';

import './css/Style.css';

class Public extends AbstractComponent { 
    constructor(props) {
        super(props);

        this.state = {
            topnavMenu: []
        }
    } 

    admin() {
        if(!this.isAdmin())
            return (
                <Login                 
                    route={(item) => this.browserRoute.history.push(item.link)}
                />
            );

        return (
            <Route                 
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

    componentDidMount() {                
        let menus = [];                            
        
        menus.push(this.addMenu('fas fa-user-lock', 'Área Administrativa', '/admin'));                

        this.setState({
            topnavMenu: menus    
        });
    }

    render() {
        return (
            <Fragment>
                <TopNav            
                    menu={this.state.topnavMenu}

                    title="Área Pública"
                    
                    showIconMenu={false}         

                    route={item => this.browserRoute.history.push(item.link) }

                    onClick={() => this.browserRoute.history.push(this.homePage2().link)}
                />

                <div id="layoutSidenav">                    
                    <div id="layoutSidenav_content" style={{paddingLeft: '0px'}}>
                        <main>                                                
                            <div className="container-fluid container-custom">       
                                <BrowserRouter ref={(ref) => this.browserRoute =  ref}>
                                    <Switch>   
                                        <Route 
                                            exact 
                                            path='/'
                                            render={props => 
                                                <EventList
                                                    {...props}
                                                        
                                                    route={(item) => this.browserRoute.history.push(item.link)}
                                                />
                                            }
                                        />

                                        <Route 
                                            exact 
                                            path='/detail/:id'
                                            render={props => 
                                                <EventDetail
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
                            </div>
                        </main>
                    </div>
                </div>
            </Fragment>            
        )
    }
}

export default Public;