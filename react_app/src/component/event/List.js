import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";

import EventService from '../../service/EventService';

class List extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.state = {
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
        window.location.href = '/detail/' + referenceId;
    }

    componentDidMount() {
        EventService.list().then(response => {
            this.setState({body: response.data, preload: false})
        }).catch(() => {
            this.setState({preload: false})
        });
    }    

    render() {
        return (
            <div>
                <Title title="Lista de Eventos"/>

                <Preload show={this.state.preload} />

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