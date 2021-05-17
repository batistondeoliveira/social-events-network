import React from 'react';
import {Modal} from 'react-bootstrap';

class MyModal extends React.Component {        
    close(e) {                
        if(this.props.close !== undefined) {
            this.props.close(e);
        }
    }           

    styleHeader() {                
        return (this.props.styleHeader === undefined) ? "bg-white" : this.props.styleHeader;
    }

    styleIcon() {
        return (this.props.styleIcon === undefined) ? "" : this.props.styleIcon;
    }    

    styleCloseButton() {
        if(this.props.styleCloseButton === undefined)
            return '';

        return this.props.styleCloseButton;        
    }    

    render() {
        return (
            <Modal
                backdrop={'static'}
                show={this.props.show}
                onHide={() => this.close()}>

                <Modal.Header className={this.styleHeader()} closeButton>
                    <Modal.Title className={this.styleHeader()}>                        
                        <i className={this.styleIcon()}/> {this.props.header}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                </Modal.Body>                                          
            </Modal>
        )
    }
}

export default MyModal;