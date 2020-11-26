import React from 'react';

class Title extends React.Component {
    render() {
        return(            
            <h1 className="mt-4 mb-4">
                {this.props.title}
            </h1>
        )
    }
}

export default Title;