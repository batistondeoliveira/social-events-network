import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';
import ModalDetail from '../event/ModalDetail';

import NotificationService from '../../service/NotificationService';

import NotificationType from '../../enumerador/NotificationType';

class List extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.state = {
            filter: {
                date: '',
                place: ''
            },

            head : [
                {nome: 'Nome', campo: 'name'},                
                {nome: 'Email', campo: 'email'},
                {nome: 'Tipo', campo: 'type', type: "enum"}                
            ],

            body: [],

            preload: true,

            error: '',

            success: '',

            detail: undefined
        }        
    }                 

    componentDidMount() {        
        NotificationService.notification(
            
        ).then(response => {
            this.setState({body: response.data, preload: false})
        }).catch(error => {
            if(this.is401Error(error)) {
                this.goLoginArea();
                return;
            }
                
            this.setState({
                preload: false,
                error: this.handlingError(error)                
            });            
        });
    }    

    render() {
        return (
            <div>
                <ModalAlerta 
                    show={this.state.error !== ''}
                    text={this.state.error}
                    close={() => this.setState({error: ''})} 
                />

                <ModalSuccess
                    show={this.state.success !== ''}
                    text={this.state.success}
                    close={() => this.setState({success: ''})} 
                />

                <ModalDetail
                    show={this.state.detail !== undefined}
                    detail={this.state.detail}
                    
                    close={() => this.setState({detail: undefined})}
                />

                <Title title="Notificações"/>

                <Preload show={this.state.preload} />                                              

                <Table
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}  
                                                            
                    getEnumName={(enumName) => NotificationType.get(enumName).description}
                    onOpenClick={(item) => this.setState({detail: item})}                    
                />
            </div>
        )
    }
}

export default List;