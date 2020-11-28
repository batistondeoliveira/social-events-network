import React from 'react';
import {Col} from 'react-bootstrap';
   
class Panel extends React.Component {        
    render() {
        return (
            <Col 
                md={this.props.md} 
                xs={this.props.xs} 
                sm={this.props.sm} 
                lg={this.props.lg}
                style={{
                    paddingLeft: '0px',
                    paddingRight: '0px'
                }}
            >
                <div className="card mt-3 mb-3">
                    <div className="card-header" style={{fontWeight: 'bold'}}>                        
                        {this.props.title}
                    </div>

                    <div className="card-body">
                        {this.props.children}
                    </div>
                </div>                
            </Col>
        )
    }
}

export default Panel;