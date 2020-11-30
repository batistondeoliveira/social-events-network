import React from 'react';
import {Col} from 'react-bootstrap';

class InputTextArea extends React.Component {                
    error() {
        if(Array.isArray(this.props.error)) {
            return(
                <ul>
                    {this.props.error.map( (item , i) => {
                        return (
                            <li key={i}>{item}</li>
                        )
                    })}
                </ul>
            )
        }

        return this.props.error;
    }

    className() {
        return this.props.className !== undefined ? this.props.className : '';
    }    

    classNameInput() {
        return this.props.classNameInput !== undefined ? this.props.classNameInput : '';
    }
    
    classError() {
        return this.props.error !== undefined && this.props.error !== '' ? 'form-controll-erro' : '';
    }    

    onChange(input) {        
        if (this.props.onChange !== undefined) {
          this.props.onChange(input);
        }
    }    

    onKeyPress(input) {        
        if (this.props.onKeyPress !== undefined) {
          this.props.onKeyPress(input);
        }
    }   

    onBlur(input) {        
        if (this.props.onBlur !== undefined) {
          this.props.onBlur(input);
        }
    }       

    render() {
        return (
            <Col md={this.props.md} 
                 xs={this.props.xs} 
                 sm={this.props.sm} 
                 lg={this.props.lg}>
                <div className={this.className() + ' ' + this.classError()} >
                    <label style={{float: 'left'}} htmlFor={this.props.name}>
                        {this.props.children}                        
                    </label>

                    <textarea 
                        name={this.props.name}                            
                        id={this.props.id}     
                        value={this.props.value}                                                
                        className={"form-control " + this.classNameInput()}
                        disabled={this.props.disabled}                         
                        row={this.props.row}
                        onChange={input => this.onChange(input)}                            
                        onKeyPress={input => this.onKeyPress(input)}
                        onBlur={e => this.onBlur(e)}
                        readOnly={this.props.readOnly} 
                    />

                    <span className="help-block">
                        {this.error()}
                    </span>
                </div>
            </Col>
        )
    }
}

InputTextArea.defaultProps = {
    md: 12,    
    readOnly: false,    
};

export default InputTextArea;