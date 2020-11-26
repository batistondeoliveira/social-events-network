import React from 'react';
import {Col} from 'react-bootstrap';

class Button extends React.Component {                    
    className() {
        return this.props.className !== undefined ? this.props.className : '';
    }    

    classNameButton() {
        return this.props.classNameButton !== undefined ? this.props.classNameButton : '';
    }     
    
    onClick(e) {
        if(this.props.onClick === undefined)
            return ;

        this.props.onClick(e);
    }

    render() {
        return (
            <Col md={this.props.md} 
                 xs={this.props.xs} 
                 sm={this.props.sm} 
                 lg={this.props.lg}>
                <div className={this.className()} >
                    <label style={{float: 'left'}} htmlFor={this.props.name}>
                        &nbsp;                        
                    </label>

                    <button 
                        type={this.props.button}
                        className={"form-control " + this.props.classNameButton}
                        onClick={(e) => this.onClick()}
                    >
                        {this.props.children}    
                    </button>                    
                </div>
            </Col>
        )
    }
}

Button.defaultProps = {
    md: 12,
    type: 'text',
    classNameButton: 'btn btn-primary'
};

export default Button;