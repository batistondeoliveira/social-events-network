import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import InputDate from '../layout/input/InputDate';
import Panel from '../layout/panel/Panel';
import Button from '../layout/button/Button';

import FriendService from '../../service/FriendshipService';

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
                {nome: 'Email', campo: 'email'}                
            ],

            body: [],

            preload: true
        }        
    }            

    componentDidMount() {
        FriendService.list(
            
        ).then(response => {
            this.setState({body: response.data, preload: false})
        }).catch(() => {
            this.setState({preload: false})
        });
    }    

    render() {
        return (
            <div>
                <Title title="Lista de Amigos"/>

                <Preload show={this.state.preload} />                                              

                <Table
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}                    
                    cadastro={false} 
                    referenceId="id"                    
                />
            </div>
        )
    }
}

export default List;