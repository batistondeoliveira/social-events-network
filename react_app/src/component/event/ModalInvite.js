import React from 'react';
import {Modal} from 'react-bootstrap';
import AbstractComponent from '../AbstractComponent';
import Table from "../layout/table/Table";
import Alerta from '../layout/alerta/Alerta';
import Register from './Register';

import FriendshipService from '../../service/FriendshipService';
import InviteEventService from '../../service/InviteEventService';

class ModalInvite extends AbstractComponent { 
    constructor(props) {
        super(props);

        this.state = {
            head : [
                {nome: 'Nome', campo: 'name'},                
                {nome: 'E-mail', campo: 'email'},
                {nome: 'Marcar', campo: 'checked', type: "checked"}               
            ],

            body: [],

            checkAll: 0,

            checkItem: 0,

            error: ''
        }
    }   

    check(item, i) {        
        const body = this.state.body;

        item.checked = (parseInt(item.checked, 10) === 0 ? 1 : 0);   
        
        var checkItem = this.state.checkItem;

        if(item.checked)
            checkItem++;
        else    
            checkItem--;
        
        body.splice(i, 1, item);

        this.setState({
            body: body,
            checkItem: checkItem,          
            checkAll: (checkItem === body.length ? 1 : 0)
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
            checkAll: (this.state.checkAll === 0 ? 1 : 0),
            checkItem: body.length
        });
    }        

    sendInvite() {
        if(this.state.checkItem === 0) {
            this.setState({error: 'Você deve escolher pelo menos um amigo'});

            return ;
        }

        InviteEventService.invite(
            this.props.event.id,
            this.state.body
        ).then(() => {            
            this.props.success();
        }).catch(error => { 
            if(this.is401Error(error)) {
                this.props.route(this.goLoginArea());
                return ;
            }
                                
            this.setState({                
                btnFinalizar: 'Convidar',
                error: this.handlingError(error)
            });            
        });
    }

    componentDidMount() {
        FriendshipService.inviteEventList(
            this.props.event.id
        ).then(response => {
            this.setState({body: response.data});
        })        
    }

    render() {
        return (
            <Modal    
                backdrop={'static'}            
                show={this.props.show}
                onHide={() => this.props.close()}>

                <Modal.Header closeButton>
                    <Modal.Title>Convide seus amigos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>
                        <label>
                            Evento:
                        </label> 
                        
                        &nbsp;

                        { this.props.event.name}
                    </h4>

                    <hr/>

                    <Alerta
                        show={this.state.error !== ''}
                        error={this.state.error}
                        timeOut={5}

                        close={() => this.setState({error: ''})}
                        onTimeOut={() => this.setState({error: ''})}
                    />

                    <Table
                        ref={ref => this.table = ref}
                        head={this.state.head}
                        body={this.state.body}                                                                                         
                        
                        marcar={() => this.checkAll()}
                        onChange={(item, i) => this.check(item, i)}
                        checkAll={this.state.checkAll}
                        btnAux={() => this.sendInvite()}
                        btnAuxTxt="Enviar convite"
                        
                        component={ (props) => { return <Register 
                                ok={(item, i) => this.add(item, i)} {...props}    
                                
                                route={item => this.props.route(item)}
                            />
                        }}
                    />
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalInvite;