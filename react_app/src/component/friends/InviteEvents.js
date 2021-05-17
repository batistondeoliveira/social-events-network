import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import Invite from './Invite';
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';

import FriendshipService from '../../service/FriendshipService';

class InviteEvents extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.state = {            
            head : [
                {nome: 'Nome', campo: 'name'},                
                {nome: 'Email', campo: 'email'},
                {nome: 'Marcar', campo: 'checked', type: 'checked'},
            ],

            body: [],

            preload: true,

            error: '',

            success: '',

            checkAll: 0
        }        
    }                

    componentDidMount() {        
        FriendshipService.list(
            
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

    check(item, i) {        
        const body = this.state.body;

        item.checked = (parseInt(item.checked, 10) === 0 ? 1 : 0);               
        
        body.splice(i, 1, item);

        this.setState({
            body: body            
        });
    }

    checkAll() {        
        let body = this.state.body;
        
        body.map((item, i) => {
            item.checked = (this.state.checkAll === 0 ? 1 : 0);

            body.splice(i, 1, item);  
            
            return body;
        })        
        
        this.setState({
            body: body,
            checkAll: (this.state.checkAll === 0 ? 1 : 0)
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

                <Title title="Lista de Amigos"/>

                <Preload show={this.state.preload} />                                              

                <Table
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}                                         
                    tituloBtnNovo="Convidar amigo"
                    link={(item, i) => this.check(item, i)}
                    marcar={() => this.checkAll()}     
                    checkAll={this.state.checkAll}                                                        
                    titleModal="Convidar amigo"
                    referenceId="id"                                      
                />
            </div>
        )
    }
}

export default InviteEvents;