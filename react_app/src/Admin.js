import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyEvents from './component/event/MyEvents';
import NotFound from './component/layout/notfound/NotFound';
import Friendship from './component/friends/List';
import TopNav from './component/layout/nav/TopNav';
import SideNav from './component/layout/nav/SideNav';

import './css/Style.css'
import AbstractComponent from './component/AbstractComponent';

class Admin extends AbstractComponent {  
    constructor(props) {
        super(props);

        this.state = {
            menu: []
        }
    }   

    componentDidMount() {
        let menus = [];                            
        
        menus.push(this.addMenu('', 'Área Pública', '/'));
        menus.push(this.addMenu('', 'Meus eventos', '/admin'));
        menus.push(this.addMenu('', 'Lista de amigos', '/admin/friendship'));

        this.setState({
            menu: menus    
        });
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
                <TopNav 
                    menu={this.state.topnavMenu}

                    title="Área Administrativa"                     

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