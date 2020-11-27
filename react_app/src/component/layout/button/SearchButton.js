import React from 'react';
import Button from './Button';

class SearchButton extends React.Component {    
    render() {
        return (
            <Button
                md={this.props.md}
                xs={this.props.xs}
                sm={this.props.sm}
                lg={this.props.lg}                                                        
                name={this.props.name}
                classNameButton="btn btn-primary" 
                onClick={ e => this.props.onClick(e) }
            >
                <i className="fa fa-search" />
            </Button>
        )
    }
}

SearchButton.defaultProps = {
    md: 12    
};

export default SearchButton;