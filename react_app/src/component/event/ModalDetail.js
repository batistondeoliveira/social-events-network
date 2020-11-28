import React from 'react';
import AbstractComponent from '../AbstractComponent';

import {dateFormat} from '../../functions/Format';

class ModalDetail extends AbstractComponent {
    onClick() {    
        window.location.href = '/';
    }     

    render() {
        return (            
            <MyModal
                show={this.props.show}

                close={() => this.props.close()}
            >
                <Detail />
            </MyModal>                                                          
        )
    }
}

export default ModalDetail;