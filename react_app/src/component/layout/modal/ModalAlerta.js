import React from 'react';
import MyModal from './MyModal';

class ModalAlerta extends React.Component {    
    close() {
        if(this.props.close !== undefined) {
            this.props.close();
        }
    }

    render() {
        return (
            <MyModal 
                styleHeader="bg-danger"
                styleIcon="fa fa-exclamation-triangle"
                styleText={this.props.styleText}
                className="modal_alert "                     
                classNameButton="btnDange"
                styleButton="btn btn-danger"
                show={this.props.show}                      
                header={this.props.header}
                text={this.props.text}
                buttonTxt="Ok" 
                close={e => this.close(e)} 
            />            
        )
    }
}

ModalAlerta.defaultProps = {
    header: 'Alerta',
    styleText: ''
}

export default ModalAlerta;