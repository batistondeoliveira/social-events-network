import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import InputDate from '../layout/input/InputDate';
import Panel from '../layout/panel/Panel';
import Button from '../layout/button/Button';
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

    onClick() {
        this.search();
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
                    <div className="col-md-5
                                    col-sm-5
                                    col-lg-5
                                    col-xs-5">
                        <InputDate
                            md={6}
                            xs={6}
                            sm={6}
                            lg={6}
                            name="date"                                    
                            classNameInput="background-transparent"  
                            value={this.state.filter.date}                                                                            
                            onChange={(e) => this.onChange(e)}
                        >
                            Data
                        </InputDate>
                    </div>

                    <div className="col-md-5
                                    col-sm-5
                                    col-lg-5
                                    col-xs-5">
                        <InputSelectPlace
                            md={4}
                            xs={4}
                            sm={4}
                            lg={4}                                                        
                            name="place"                         
                            value={this.state.filter.place}    
                            defaultValue={this.state.filter.place}                                            
                            onChange={ e => this.onChange(e) } 

                            route={item => this.props.route(item)}
                        />
                    </div>

                    <Button
                        md={2}
                        xs={2}
                        sm={2}
                        lg={2}                                                        
                        name="filtrar"
                        classNameButton="btn btn-primary"
                        onClick={ e => this.onClick(e) }
                    >
                        Filtrar
                    </Button>
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