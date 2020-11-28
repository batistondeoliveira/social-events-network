import React, { Fragment } from 'react';
import AbstractComponent from '../../AbstractComponent';
import ModalWarning from '../modal/ModalWarning';
import ModalAlerta from '../modal/ModalAlerta';

import AuthenticateService from '../../../service/AuthenticateService';
import BadgeService from '../../../service/BadgeService';

class TopNav extends AbstractComponent {  
    constructor(props) {
        super(props);

        this.state = {            
            preload: false,

            toggle: false,

            message: '',

            error: '',

            notification: 0,
        }
    }    

    onClick() {
        var el = document.getElementById("body");

        if(this.state.toggle) {
            el.classList.remove("sb-sidenav-toggled");
            this.setState({toggle: false});

            return;
        }

        el.classList.add("sb-sidenav-toggled");
        this.setState({toggle: true});
    }    

    onBadgeBtnClick() {        
        if(this.state.notification === 0) {
            this.setState({message: 'Não há notificações'});
        
            return ;
        }
        

        
    }

    menu() {        
        if(this.props.menu === undefined)
            return ;
            
        return (
            this.props.menu.map((item, i ) => {
            return(
                <a 
                    className="dropdown-item" 
                    onClick={() => this.props.route(item)}
                    key={i}
                >
                    <span className="btn-navigation__icon">                                            
                        <i className={item.icone} aria-hidden="true" />                                            
                    </span>
                    
                    &nbsp;
                    
                    <span className="btn-navigation__label">
                        {item.nome}
                    </span>                                                                            
                </a>                                    
            )})
        )      
    }

    showMenu() {
        if(!this.isAdmin())
            return (
                <a 
                    className="nav-link" 
                    id="userDropdown" 
                    role="button" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false" 
                    onClick={() => this.props.route(this.goLoginArea())}
                >
                    <i className="fas fa-user fa-fw"/>                    
                </a>
            );

        return (
            <Fragment>                
                <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user fa-fw">
                    </i>
                </a>

                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown" style={{padding: '10px'}}>
                    <div className="user-menu-items__name">
                        Olá, {AuthenticateService.getUserName()}
                    </div> 

                    { this.menu() } 

                    <a 
                        className="dropdown-item" 
                        onClick={() => this.logout()}>
                        <span className="btn-navigation__icon">                                                                        
                            <i className="fas fa-sign-out-alt"/>
                        </span>
                        
                        <span className="btn-navigation__label">
                            &nbsp; Sair
                        </span>
                    </a>
                </div>  
            </Fragment>
        )
    }

    showNotification() {
        if(!this.isAdmin())
            return;

        return (
            <button 
                type="button" 
                className={"notification-badge " + (this.state.notification > 0 ? '-animation' : '') }
                style={{marginRight: (this.state.notification > 0 ? '' : '20px')}}
                onClick={() => this.onBadgeBtnClick()}
            >
                <i class="fas fa-envelope" onClick={() => this.onBadgeBtnClick()} />

                {
                    this.state.notification > 0 &&
                    <span class="badge badge-light" onClick={() => this.onBadgeBtnClick()}>
                        { this.state.notification }
                    </span>
                }                    
            </button>
        )
    }

    componentDidMount() {
        if(!this.isAdmin())
            return;

        this.setState({preload: true});

        BadgeService.badge().then(response => {
            this.setState({
                notification: response.data,
                preload: false
            });
        }).catch(error => {
            if(this.is401Error(error)) {
                this.goLoginArea();
                return;
            }
            
            this.setState({
                error: this.handlingError(error),
                preload: false
            })
        });
    }

    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <ModalAlerta
                    show={this.state.error !== ''}
                    text={this.state.error}

                    close={() => this.setState({error: ''})}
                />

                <ModalWarning 
                    show={this.state.message !== ''}
                    text={this.state.message}

                    close={() => this.setState({message: ''})}
                />

                <a className="navbar-brand" onClick={() => this.props.onClick()}>
                    {this.props.title}
                </a>                            

                {
                    this.props.showIconMenu &&                
                    <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={() => this.onClick()}>
                        <i className="fas fa-bars">
                        </i>
                    </button>
                }
                
                <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">                    
                </div>
                
                {this.showNotification()}

                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        { this.showMenu() }                     
                    </li>
                </ul>
            </nav>
        )
    }
}

TopNav.defaultProps = {
    showIconMenu: true    
}

export default TopNav;