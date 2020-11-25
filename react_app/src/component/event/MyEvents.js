import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import Register from './Register';

import EventService from '../../service/EventService';
import ModalAlerta from '../layout/modal/ModalAlerta';

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
                {nome: 'Lugar', campo: 'place'}
            ],

            body: [],

            preload: true,

            error: ''
        }

    }   

    remover(item , i) {
        this.setState({preload: true});

        EventService.delete(
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

                <ModalAlerta
                    show={this.state.error !== ''}
                    text={this.state.error}

                    close={() => this.setState({error: ''})}
                />

                <Preload show={this.state.preload} />

                <Table
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}                    
                    remover={this.remover}
                    cadastro={true}
                    editar={ true }     
                    component={ (props) => { return <Register 
                            ok={(item, i) => this.add(item, i)} {...props}                              
                        />
                    }}
                />
            </div>
        )
    }
}

export default MyEvents;