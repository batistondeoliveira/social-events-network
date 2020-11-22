import React, { Fragment } from 'react';
import config from '../../../Config';
   
class Preload extends React.Component {    
    show() {
        if(!this.props.show)
            return ;

        return (
            <div 
                className="modal"
                tabIndex="-1" 
                role="dialog" 
                style={{display: 'block'}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">                        
                        <div className="modal-body">                        
                            <div className="col-md-12                                 
                                            col-sm-12                                                
                                            col-lg-12                                                
                                            col-xs-12
                                            text-center" 
                                style={{
                                    wordWrap: 'break-word', 
                                    marginBottom: '15px'
                                }}>

                                <img src={config.urlImg + "preload.gif"} width="16px" height="16px" alt="Loading..."/> <br/>
                                
                                Carregando                       
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                {this.show()}
            </Fragment>
        )
    }
}

export default Preload;