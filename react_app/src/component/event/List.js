import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import InputDate from '../layout/input/InputDate';
import Panel from '../layout/panel/Panel';
import SearchButton from '../layout/button/SearchButton';
import ClearButton from '../layout/button/ClearButton';
import InputSelectPlace from './InputSelectPlace';

import EventService from '../../service/EventService';

import {route} from '../../functions/Route';

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
                {nome: 'Data', campo: 'date', type: 'date'},
                {nome: 'Hora', campo: 'time'},
                {nome: 'Lugar', campo: 'place'}
            ],

            body: [],

            preload: true
        }        
    }

    onOpenClick(referenceId) {
        this.props.route(route('', '', '/detail/' + referenceId));
    }

    clearFilter() {
        const filter = this.state.filter;

        filter.date = '';
        filter.place = '';

        this.setState({filter: filter});

        this.search();
    }

    onChange(e) {
        const filter = this.state.filter;
        filter[e.target.name] = e.target.value;
        this.setState({filter: filter});
    }

    sendFilter() {
        const filter = this.state.filter;
        const list = [];

        if(filter.date) 
            list.push({field: 'date', value: filter.date});

        if(filter.place)
            list.push({field: 'place', value: filter.place});

        return list;
    }

    search() {
        this.setState({preload: true});
                
        EventService.list(
            this.sendFilter()
        ).then(response => {
            this.setState({body: response.data, preload: false})
        }).catch(() => {
            this.setState({preload: false})
        });
    }    

    componentDidMount() {
        this.search();
    }    

    render() {
        return (
            <div>
                <Title title="Lista de Eventos"/>

                <Preload show={this.state.preload} />

                <Panel
                    md={12} 
                    xs={12} 
                    sm={12} 
                    lg={12}
                    title="Filtros"
                >                    
                    <InputDate
                        md={3}
                        xs={3}
                        sm={3}
                        lg={3}
                        name="date"                                    
                        classNameInput="background-transparent"  
                        value={this.state.filter.date}                                                                            
                        onChange={(e) => this.onChange(e)}
                    >
                        Data
                    </InputDate>                    
                    
                    <InputSelectPlace
                        md={7}
                        xs={7}
                        sm={7}
                        lg={7}                                                        
                        name="place"                         
                        value={this.state.filter.place}    
                        defaultValue={this.state.filter.place}                                            
                        onChange={ e => this.onChange(e) } 

                        route={item => this.props.route(item)}
                    />                    

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
                        onClick={ e => this.clearFilter() }
                    />
                </Panel>                                

                <Table
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}                    
                    cadastro={false} 
                    referenceId="id"
                    onOpenClick={(referenceId) => this.onOpenClick(referenceId)}
                />
            </div>
        )
    }
}

export default List;