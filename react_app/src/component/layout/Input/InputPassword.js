import React, { Fragment } from 'react';
import AbstractComponent from '../../AbstractComponent';
import Input from './Input';

class InputPassword extends AbstractComponent {            
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

    render() {
        return ( 
            <Fragment>
                <Input
                    md={this.props.md}
                    xs={this.props.xs} 
                    sm={this.props.sm}
                    lg={this.props.lg}
                    classNameInput={this.props.classNameInput}
                    maxLength={this.props.maxLength}
                    type="password"
                    id={this.props.id}
                    name={this.props.name}                        
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    error={this.props.error}
                    disabled={this.props.disabled}

                    onChange={e => this.onChange(e)}
                    onKeyPress={e => this.onKeyPress(e)}
                >
                    {this.props.children}                                       
                </Input>                    
            </Fragment>                         
        )
    }
}

export default InputPassword;