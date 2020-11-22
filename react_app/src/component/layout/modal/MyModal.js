import React, { Fragment } from 'react';
import {Button} from 'react-bootstrap';
import AbstractComponent from '../../AbstractComponent';

class MyModal extends AbstractComponent {        
    close(e) {                
        if(this.props.close !== undefined) {
            this.props.close(e);
        }
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

    styleHeader() {                
        return (this.props.styleHeader === undefined) ? "bg-white" : this.props.styleHeader;
    }

    styleIcon() {
        return (this.props.styleIcon === undefined) ? "" : this.props.styleIcon;
    }

    styleText() {
        return (this.props.styleText === undefined) ? "text-dark" : this.props.styleText;        
    }

    styleButton() {
        return (this.props.styleButton === undefined) ? "btn-primary" : this.props.styleButton;        
    }

    styleCloseButton() {
        if(this.props.styleCloseButton === undefined)
            return '';

        return this.props.styleCloseButton;        
    }

    show() {
        if(!this.props.show)
            return ;

        return (
            <div 
                className={"modal " + this.className} 
                tabIndex="-1" 
                role="dialog" 
                style={{display: 'block'}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {
                            this.props.header !== "" &&
                            <div className={"modal-header " + this.styleHeader()}>
                                <div className="col-md-10                                 
                                                col-sm-10                                                
                                                col-lg-10                                                
                                                col-xs-10"> 
                                    <h4>
                                        <i className={this.styleIcon()}/> {this.props.header}
                                    </h4>
                                </div>

                                <div className="col-md-2                                 
                                                col-sm-2                                                
                                                col-lg-2                                                
                                                col-xs-2"> 
                                    <button type="button" className={"close " + this.styleCloseButton()} data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        }

                        <div className="modal-body">
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
                        </div>

                        <div className="modal-footer">
                            <Button 
                                className={"btn " + this.styleButton()}  
                                type="button" 
                                onClick={(e) => {this.close(e)}}
                            >
                                {this.props.buttonTxt}
                            </Button>
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

MyModal.defaultProps = {
    textArray: []
}

export default MyModal;