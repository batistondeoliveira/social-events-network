import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import AbstractComponent from '../../AbstractComponent';
import MyModal from './MyModal';

class ModalMessage extends AbstractComponent {                
    close() {
        if(this.props.close !== undefined)
            this.props.close();
    }

    styleList(i) {
        if(i === 0)
            return {
                marginBottom: '25px',
                fontWeight: '700'
            };

        return {listStyle: 'circle'}
    }

    text() {                
        if(Array.isArray(this.props.text))
            return (
                <ul>
                    {this.props.text.map((item, i) => {
                        return (
                            <li 
                                style={this.styleList(i)}
                                key={i}
                            >
                                {item}
                            </li>
                        )
                    })}
                </ul>
            );
        
        const text = (this.props.text === undefined) ? '' : this.props.text;

        return (text === undefined || text === '' || text ===  null) ? this.standardError() : text;                      
    } 
    
    subText() {            
        return this.props.subText === undefined ? '' : this.props.subText;                      
    }     

    styleText() {
        return (this.props.styleText === undefined) ? "text-dark" : this.props.styleText;        
    }

    styleButton() {
        return (this.props.styleButton === undefined) ? "btn-primary" : this.props.styleButton;        
    }    

    render() {
        return (            
            <MyModal
                show={this.props.show}
                header={this.props.header}
                styleHeader={this.props.styleHeader}
                styleIcon={this.props.styleIcon}

                close={() => this.props.close()}
                
                footer={() => this.footer()}
            >
                <Modal.Body>
                    <div 
                        className={this.styleText()} 
                        style={{
                            wordWrap: 'break-word', 
                            marginBottom: '15px'
                        }}>

                        {this.text()}

                        <br/>
                        <br/>

                        {this.subText()}                        
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        className={"btn " + this.styleButton()}  
                        type="button" 
                        onClick={(e) => {this.close(e)}}
                    >
                        {this.props.buttonTxt}
                    </Button>
                </Modal.Footer>
            </MyModal>  
        )
    }
}

ModalMessage.defaultProps = {
    textArray: []
}

export default ModalMessage;