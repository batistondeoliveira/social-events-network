import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Preload from "../layout/preload/Preload";
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';
import Panel from '../layout/panel/Panel';
import InputSelect from '../layout/input/InputSelect';
import ClearButton from '../layout/button/ClearButton';
import SearchButton from '../layout/button/SearchButton';
import ModalInvite from './ModalInvite';
import MyEventTable from "./MyEventTable";
import ModalDetail from './ModalDetail';
import Register from './Register';

import EventPropertyType from '../../enumerador/EventPropertyType';
import StatusEventType from '../../enumerador/StatusEventType';

import EventService from '../../service/EventService';

class MyEvents extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.remover = this.remover.bind(this);

        this.state = {
            filter: {
                status: '',
                type: ''
            },

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

            detail: undefined,

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

    clearFilter() {
        const filter = this.state.filter;

        filter.type = '';
        filter.status = '';

        this.setState({filter: filter});

        this.search();
    }
    
    onChange(e) {
        const filter = this.state.filter;
        
        filter[e.target.name] = e.target.value;

        if((e.target.name === 'type')&&(e.target.value !== EventPropertyType.GUEST.enumName)) 
            filter['status'] = 'Selecione';        


        this.setState({filter: filter});
    }

    sendFilter() {
        const filter = this.state.filter;
        const list = [];

        if((filter.status)&&(filter.status !== 'Selecione'))
            list.push({field: 'status', value: filter.status});
        
        if((filter.type)&&(filter.type !== 'Selecione'))
            list.push({field: 'type', value: filter.type});

        return list;
    }

    search() {
        this.setState({preload: true});

        EventService.getMyEvents(            
            this.sendFilter()
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

    componentDidMount() {
        if(!this.isAdmin()) {
            this.setState({error: 'Area restrita, faça seu login ou cadastre-se gratuitamente'});

            return ;
        }
            
        this.search();
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
                <Title title="Meus Eventos"/>

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

                <ModalDetail
                    show={this.state.detail !== undefined}
                    detail={this.state.detail}
                    
                    close={() => this.setState({detail: undefined})}
                />

                {
                    this.state.invite &&                
                    <ModalInvite
                        show={this.state.invite}

                        event={this.state.event}

                        success={() => this.setState({invite: false, event: {}, success: 'Convite enviado com sucesso'})}
                        close={() => this.setState({invite: false, event: {}})}
                    />
                }

                <Panel
                    md={12} 
                    xs={12} 
                    sm={12} 
                    lg={12}
                    title="Filtros"
                >         
                    <InputSelect
                        md={5}
                        xs={5}
                        sm={5}
                        lg={5}                                                        
                        name="type"                         
                        value={this.state.filter.type}    
                        defaultValue={this.state.filter.type}   
                        options={EventPropertyType.getAll()}                                         
                        onChange={ e => this.onChange(e) } 

                        route={item => this.props.route(item)}
                    >             
                        Tipo       
                    </InputSelect>

                    <InputSelect
                        md={5}
                        xs={5}
                        sm={5}
                        lg={5}
                        name="status"                                    
                        classNameInput="background-transparent"  
                        value={this.state.filter.status}     
                        disabled={this.state.filter.type !== EventPropertyType.GUEST.enumName}
                        options={StatusEventType.getAll()}                                                                       
                        onChange={(e) => this.onChange(e)}
                    >
                        Situação
                    </InputSelect>                                                        

                    <SearchButton
                        md={1}
                        xs={1}
                        sm={1}
                        lg={1}                                                        
                        name="filter"
                        classNameButton="btn btn-primary"
                        onClick={ e => this.search() }
                    />

                    <ClearButton
                        md={1}
                        xs={1}
                        sm={1}
                        lg={1}                                                        
                        name="clear"
                        classNameButton="btn btn-danger"
                        onClick={ e => this.clearFilter() }
                    />                                        
                </Panel>

                <MyEventTable
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}                    
                    remover={this.remover}
                    titleMsgRemove={'Tem certeza de que deseja cancelar o evento?'}
                    cadastro={true}
                    editar={ true }   
                    onInvite={(item) => this.setState({event: item, invite: true})} 
                    onOpenClick={(item) => this.setState({detail: item})}                    
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