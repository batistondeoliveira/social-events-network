import React from 'react';

class Title extends React.Component {
    render() {
        return(
            <div className="principal">
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

export default Title;