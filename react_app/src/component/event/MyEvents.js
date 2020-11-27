import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';
import ModalInvite from './ModalInvite';
import Register from './Register';

import EventPropertyType from '../../enumerador/EventPropertyType';
import EventService from '../../service/EventService';
import AuthenticateService from '../../service/AuthenticateService';

class MyEvents extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.remover = this.remover.bind(this);

        this.state = {
            head : [
                {nome: 'Nome', campo: 'name'},                
                {nome: 'Data', campo: 'date', type: 'date'},
                {nome: 'Hora', campo: 'time'},
                {nome: 'Lugar', campo: 'place'},                
                {nome: 'Tipo', campo: 'type', type: 'enum'},
            ],

            body: [],

            preload: true,

            invite: false,

            event: {},

            error: '',
            
            success: ''
        }

    }   

    remover(item , i) {
        this.setState({preload: true});

        EventService.cancelar(
            item.id
        ).then(() => {
            const event = this.state.body;

            event.splice(i, 1);

            this.setState({
                body: event, 
                preload: false
            });
        });
    }    

    componentDidMount() {
        if(!this.isAdmin()) {
            this.setState({error: 'Area restrita, faça seu login ou cadastre-se gratuitamente'});

            return ;
        }
            
        EventService.getMyEvents(
            AuthenticateService.getEmail()
        ).then(response => {
            this.setState({body: response.data, preload: false})
        }).catch(error => {
            if(this.is401Error(error)) {
                this.props.route(this.goLoginArea());
                return;
            }
                
            this.setState({
                preload: false,
                error: this.handlingError(error)                
            });
        });
    }    

    add(item, i ) {        
        this.table.fecharCadastro();
        const body = this.state.body;        

        if(i === undefined)  {
            body.push(item);
            this.setState({body: body});
            return;
        }

        body[i] = item;
        this.setState({body: body});
    }    

    render() {
        return (
            <div>
                <Title title="Lista de Eventos"/>

                <ModalSuccess
                    show={this.state.success !== ''}
                    text={this.state.success}

                    close={() => this.setState({success: ''})}
                />

                <ModalAlerta
                    show={this.state.error !== ''}
                    text={this.state.error}

                    close={() => this.setState({error: ''})}
                />

                <Preload show={this.state.preload} />

                {
                    this.state.invite &&                
                    <ModalInvite
                        show={this.state.invite}

                        event={this.state.event}

                        success={() => this.setState({invite: false, event: {}, success: 'Convite enviado com sucesso'})}
                        close={() => this.setState({invite: false, event: {}})}
                    />
                }

                <Table
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}                    
                    remover={this.remover}
                    titleMsgRemove={'Tem certeza de que deseja cancelar o evento?'}
                    cadastro={true}
                    editar={ true }   
                    onOpenClick={(id, item) => this.setState({event: item, invite: true})} 
                    iconOpenClick={"fas fa-user-plus"} 
                    getEnumName={(enumName) => EventPropertyType.get(enumName).description}
                    component={ (props) => { return <Register 
                            ok={(item, i) => this.add(item, i)} {...props}    
                            
                            route={item => this.props.route(item)}
                        />
                    }}
                />
            </div>
        )
    }
}

export default MyEvents;