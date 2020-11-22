import React from 'react';
import AbstractComponent from '../../AbstractComponent';
import MyModal from './MyModal';

class ModalSuccess extends React.Component {                
    close(e) {
        if(this.props.close !== undefined) {
            this.props.close(e);
        }
    } 

    render() {
        return (
            <MyModal 
                styleHeader="bg-success"
                styleIcon="fa fa-info-circle"                     
                className="modal_alert "                     
                classNameButton="btnSuccess"
                styleButton="btn btn-success"  
                styleCloseButton="text-white"
                show={this.props.show}                      
                header={this.props.header}
                text={this.props.text}
                subText={this.props.subText}
                buttonTxt="Ok" 
                close={e => this.close(e)} 
            />            
        )
    }
}

ModalSuccess.defaultProps = {
    header: 'Sucesso'
}

export default ModalSuccess;