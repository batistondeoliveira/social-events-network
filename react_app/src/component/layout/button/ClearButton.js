import React from 'react';
import Button from './Button';

class ClearButton extends React.Component {    
    render() {
        return (
            <Button
                md={this.props.md}
                xs={this.props.xs}
                sm={this.props.sm}
                lg={this.props.lg}                                                        
                name={this.props.name}
                classNameButton="btn btn-danger"
                onClick={ e => this.props.onClick(e) }
            >
                <i class="fa fa-eraser" />
            </Button>
        )
    }
}

ClearButton.defaultProps = {
    md: 12    
};

export default ClearButton;