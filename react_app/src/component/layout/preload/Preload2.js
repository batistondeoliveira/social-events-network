import React from 'react';
import Config from '../../../Config';

class Preload2 extends React.Component {    
    render() {
        return (
            <div className={"vitrine preload " + (this.props.show ? '' : 'display-none')}>
                <div className={"col-md-12 col-sm-12 col-lg-12 col-xs-12 text-center"}>
                    <img src={Config.urlImg + "preload_botao.gif"} alt="Loading..." width='35px' height='35px'/> 
                </div>                
            </div>
        )
    }
}

export default Preload2;