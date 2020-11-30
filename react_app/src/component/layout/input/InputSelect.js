import React from 'react';
import { Col } from 'react-bootstrap';
import AbstractComponent from '../../AbstractComponent';

class InputSelect extends AbstractComponent {
    constructor(props) {
        super(props);
        this.id = this.props.id || this.props.name;
    }

    classError() {
        return this.props.error !== undefined && this.props.error !== '' ? 'form-controll-erro' : '';
    }    

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

    onChangeSelect(input) {
        if(this.props.onChange !== undefined) {
            this.props.onChange(input);
        }
    }

    classNameInput() {
        return this.props.classNameInput !== undefined ? this.props.classNameInput : '';
    }

    onBlur(blur) {
        if (this.props.onBlur !== undefined) {
            this.props.onBlur(blur);
        }
    }    

    render() {
        return (
            <Col lg={this.props.lg} 
                 md={this.props.md} 
                 sm={this.props.sm} 
                 xs={this.props.xs}>
                <div className={this.classError()}>
                    <label htmlFor={this.props.name}>
                        {this.props.children}
                    </label>                                     

                    <select                        
                        value={this.props.value}                        
                        className={"form-control " + this.classNameInput()}
                        name={this.props.name}
                        id={this.props.id}
                        onChange={input => this.onChangeSelect(input)}
                        onBlur={blur => this.onBlur(blur)}
                        onKeyPress={e => (this.props.onKeyPress !== undefined) ? this.props.onKeyPress(e) : ''}
                        disabled={this.props.disabled}>
                        {
                            this.props.options.map((option, i) => {
                                return (
                                    <option 
                                        key={i} 
                                        value={option['value']}
                                        // selected={option.selected}
                                    >
                                        {option['description']}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <span className="help-block">
                        {this.error()}
                    </span>
                </div>
            </Col>
        )
    }
}

InputSelect.defaultProps = {
    md: '12',
    customClassComponent: ''    
};

export default InputSelect;