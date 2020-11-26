import React from 'react';
   
class SideNav extends React.Component {      
    showComponent() {        
        if(this.props.menu === undefined)
            return ;

        this.props.menu.map((item, i ) => {
            return(
                <a className="nav-link" href="index.html">
                    <div className="sb-nav-link-icon">
                        <i className={item.icone} />                                            
                    </div>

                    {item.nome}
                </a>
            );
        });
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