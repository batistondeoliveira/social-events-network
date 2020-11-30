import React from 'react';
import Input from './Input';

class InputTime extends React.Component {
    onChange(input) {                   
        var inputStr = input.target.value;
        
        inputStr = inputStr.replace(/\D/g,"");        
        inputStr = inputStr.replace(/(\d{2})(\d)/,"$1:$2");
        inputStr = inputStr.replace(/(\d{2})(\d)/,"$1:$2");        

        input.target.value = inputStr;

        if (this.props.onChange !== undefined) {
          this.props.onChange(input);
        }        
    }        
    
    render() {
        return (
            <Input
                md={this.props.md}
                xs={this.props.xs}
                sm={this.props.sm}
                lg={this.props.lg}
                type="tel"
                name={this.props.name}   
                maxLength="8"                                 
                classNameInput="background-transparent"  
                value={this.props.value}
                error={this.props.error}
                onChange={(e) => this.onChange(e)}
            >
                {this.props.children}
            </Input>
        )
    }
}

InputTime.defaultProps = {
    md: 12,    
};

export default InputTime;