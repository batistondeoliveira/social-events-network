import React from 'react';
import ModalMessage from './ModalMessage';

class ModalWarning extends React.Component {    
    close() {
        if(this.props.close !== undefined) {
            this.props.close();
        }
    }

    render() {
        return (
            <ModalMessage 
                styleHeader="bg-warning"
                styleIcon="fa fa-exclamation-triangle"
                styleText={this.props.styleText}
                className="modal_alert "                     
                classNameButton="btnWarning"
                styleButton="btn btn-warning"
                show={this.props.show}                      
                header={this.props.header}
                text={this.props.text}
                buttonTxt="Ok" 
                close={e => this.close(e)} 
            />            
        )
    }
}

ModalWarning.defaultProps = {
    header: 'Aviso',
    styleText: ''
}

export default ModalWarning;