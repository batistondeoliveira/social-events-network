import React from 'react';
   
class SideNav extends React.Component {    
    constructor(props) {
        super(props);

        this.state = {
            active: -1
        }
    }  

    link(item, i) {
        this.props.route(item);
        this.setState({active: i})
    }

    showComponent() {        
        if(this.props.menu === undefined)
            return ;

        this.props.menu.map((item, i) => {
            const link = (typeof item.link === 'string') ? item.link : -1;

            if(window.location.pathname === link) 
                this.state.active = i;            
        })

        return (
            this.props.menu.map((item, i ) => {
                return(
                    <a 
                        key={i}
                        className={"nav-link " + (this.state.active === i ? 'active' : '')}
                        onClick={() => this.link(item, i)}
                    >
                        <div className="sb-nav-link-icon">
                            <i className={item.icone} />                                            
                        </div>

                        {item.nome}
                    </a>
                );
            })
        );
    }    

    render() {
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            { this.showComponent() }                                                        
                        </div>
                    </div>                    
                </nav>
            </div>
        )
    }
}

export default SideNav;