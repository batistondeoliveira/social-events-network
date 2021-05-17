import React from 'react';
import AbstractComponent from '../../AbstractComponent';

class Alerta extends AbstractComponent {   
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

    close() {                
        if(this.props.close !== undefined) {
            this.props.close();
        }
    }       

    show() {        
        if(this.props.error === undefined || this.props.error === '' || this.props.error ===  null)
            return '';

        if(this.props.timeOut > 0) {
            setTimeout(() => this.props.onTimeOut(), this.props.timeOut * 1000);
        } 

        return this.props.error;
    }

    render() {
        return (
            <div style={{marginLeft: '5px', marginRight: '5px'}}>
                {
                    this.show() &&
                    <div className="alert alert-danger" style={this.props.style} role="alert">
                        {this.error()}
                    </div>                    
                }
            </div>
        )
    }
}

Alerta.defaultProps = {
    timeOut: 0
}

export default Alerta;