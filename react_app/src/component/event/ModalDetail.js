import React from 'react';
import MyModal from '../layout/modal/MyModal';
import Detail from './Detail';

class ModalDetail extends React.Component {    
    render() {
        return (            
            <MyModal
                    show={this.props.show}
                    header="Lista de Eventos"
                    close={() => this.props.close()}
                >
                    <Detail 
                        detail={this.props.detail} 
                        close={() => this.props.close()}
                    />
                </MyModal>                                                          
        )
    }
}

export default ModalDetail;