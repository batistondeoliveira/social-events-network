import React, { Fragment } from 'react';
import AbstractComponent from '../../AbstractComponent';
import ModalWarning from '../modal/ModalWarning';

import AuthenticateService from '../../../service/AuthenticateService';

import { route } from '../../../functions/Route';
import config from '../../../Config';

class TopNav extends AbstractComponent {  
    constructor(props) {
        super(props);

        this.state = {                        
            toggle: false,

            message: ''            
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
        if(this.props.badge === 0) {
            this.setState({message: 'Não há notificações'});
        
            return ;
        }
        
        this.props.route(route('', '', '/admin/notification'));        
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

    showPicture() {        
        if((!AuthenticateService.getProfilePicture())||(AuthenticateService.getProfilePicture() === 'null'))             
            return (
                <i className="fas fa-user fa-fw" />
            );            

        return (
            <img 
                src={config.urlImg + 'user/' + AuthenticateService.getProfilePicture()} 
                alt="Foto Perfil" 
                style={{ width: '2m', height: '2em', borderRadius: '50px'}}
            />
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
                    {this.showPicture()}
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
                className={"notification-badge " + (this.props.badge > 0 ? '-animation' : '') }
                style={{marginRight: (this.props.badge > 0 ? '' : '20px')}}
                onClick={() => this.onBadgeBtnClick()}
            >
                <i class="fas fa-envelope" onClick={() => this.onBadgeBtnClick()} />

                {
                    this.props.badge > 0 &&
                    <span class="badge badge-light" onClick={() => this.onBadgeBtnClick()}>
                        { this.props.badge }
                    </span>
                }                    
            </button>
        )
    }    

    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">                
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