import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import AbstractComponent from '../AbstractComponent';
import Alerta from '../layout/alerta/Alerta';
import Preload2 from '../layout/preload/Preload2';
import MyModal from '../layout/modal/MyModal';
import Register from './Register';
import ModalInviteTable from "./ModalInviteTable";

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

            error: '',

            preload: true,

            btnConvidarTxt: 'Enviar Convite'

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

        this.setState({btnConvidarTxt: 'Aguarde...'});

        InviteEventService.invite(
            this.props.event.id,
            this.state.body
        ).then(() => {            
            this.props.success();
            this.setState({btnConvidarTxt: 'Enviar Convite'});
        }).catch(error => { 
            if(this.is401Error(error)) {
                this.goLoginArea();
                return ;
            }
                                
            this.setState({                                
                btnConvidarTxt: 'Enviar Convite',
                error: this.handlingError(error)
            });            
        });
    }

    componentDidMount() {
        FriendshipService.inviteEventList(
            this.props.event.id
        ).then(response => {
            this.setState({body: response.data, preload: false});
        })        
    }

    render() {
        return (
            <MyModal                              
                show={this.props.show}
                header="Convide seus amigos"
                close={() => this.props.close()}>                
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

                    <Preload2 show={this.state.preload} />

                    {
                        !this.state.preload && this.state.body.length > 0 &&                   
                        <ModalInviteTable
                            ref={ref => this.table = ref}
                            head={this.state.head}
                            body={this.state.body}                                                                                         
                            
                            marcar={() => this.checkAll()}
                            onChange={(item, i) => this.check(item, i)}
                            checkAll={this.state.checkAll}
                            convidar={() => this.sendInvite()}
                            btnConvidarTxt={this.state.btnConvidarTxt}
                            
                            component={ (props) => { return <Register 
                                    ok={(item, i) => this.add(item, i)} {...props}    
                                    
                                    route={item => this.props.route(item)}
                                />
                            }}
                        />
                    }

                    {
                        !this.state.preload && this.state.body.length === 0 &&                   
                        <div 
                            className="col-md-12 
                                       col-xs-12 
                                       col-sm-12 
                                       col-lg-12
                                       text-center"
                            style={{marginBottom: '10px'}}
                        >
                            <label>
                                Você não tem mais nenhum amigo para convidar
                            </label>
                        </div>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        className="btn btn-danger"  
                        type="button" 
                        onClick={(e) => {this.props.close(e)}}
                    >
                        Fechar
                    </Button>
                </Modal.Footer>
            </MyModal>
        )
    }
}

export default ModalInvite;