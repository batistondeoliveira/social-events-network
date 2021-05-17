import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AbstractComponent from './component/AbstractComponent';
import MyEvents from './component/event/MyEvents';
import NotFound from './component/layout/notfound/NotFound';
import Friendship from './component/friends/List';
import TopNav from './component/layout/nav/TopNav';
import SideNav from './component/layout/nav/SideNav';
import Notification from './component/notification/List';
import Preload from './component/layout/preload/Preload';

import BadgeService from './service/BadgeService';

class Admin extends AbstractComponent {  
    constructor(props) {
        super(props);

        this.state = {
            topnavMenu: [],
            
            menu: [],

            badge: 0,

            preload: false
        }
    }   

    badge() {
        if(!this.isAdmin())
            return;

        this.setState({preload: true});

        BadgeService.badge().then(response => {
            this.setState({
                badge: response.data,
                preload: false
            });
        });
    }

    componentDidMount() {
        let menus = [];                            
        
        menus.push(this.addMenu('fas fa-user-lock', 'Área Administrativa', '/admin'));                

        this.setState({
            topnavMenu: menus    
        });

        menus = [];                            
        
        menus.push(this.addMenu('', 'Área Pública', '/'));
        menus.push(this.addMenu('', 'Lista de amigos', '/admin/friendship'));
        menus.push(this.addMenu('', 'Meus eventos', '/admin'));        

        this.setState({
            menu: menus    
        });

        this.badge();
    }  

    href(item) {
        if(item.link === '/') {
            this.homePage();

            return;
        }

        return this.browserRoute.history.push(item.link) ;
    }

    render() {
        return (
            <Fragment>
                <Preload show={this.state.preload} />

                <TopNav 
                    menu={this.state.topnavMenu}

                    title="Área Administrativa" 
                    badge={this.state.badge}                    

                    route={item => this.browserRoute.history.push(item.link) }    
                    
                    onClick={() => this.browserRoute.history.push(this.goAdminArea().link)}
                />

                <div id="layoutSidenav">
                    <SideNav
                        menu={this.state.menu}
                        route={item => this.href(item)}
                    />

                    <div id="layoutSidenav_content" style={{top: '0px'}}>
                        <main>                                                
                            <div className="container-fluid container-custom">    
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
                                            path='/admin/friendship'
                                            render={props => 
                                                <Friendship
                                                    {...props}
                                                        
                                                    route={(item) => this.browserRoute.history.push(item.link)}
                                                />
                                            }
                                        /> 

                                        <Route 
                                            exact 
                                            path='/admin/notification'
                                            render={props => 
                                                <Notification
                                                    {...props}
                                                        
                                                    updateBadge={() => this.badge()}
                                                    route={(item) => this.browserRoute.history.push(item.link)}
                                                />
                                            }
                                        />                                                        

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

export default Admin;