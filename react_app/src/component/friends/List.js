import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Table from "../layout/table/Table";
import Preload from "../layout/preload/Preload";
import Invite from './Invite';
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';

import FriendshipService from '../../service/FriendshipService';

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

            preload: true,

            error: '',

            success: ''
        }        
    }            

    undoFriendship(item, i) {
        this.setState({preload: true});

        FriendshipService.undoFriendship(
            item.id,
            item.type
        ).then(() => {
            const event = this.state.body;

            event.splice(i, 1);

            this.setState({
                body: event, 
                preload: false
            });
        }).catch(() => {
            this.setState({                
                preload: false
            });
        });
    }

    add(message) {        
        this.table.fecharCadastro();
        
        this.setState({success: message});
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
                    cadastro={true} 
                    tituloBtnNovo="Convidar amigo"
                    remover={(item, i) => this.undoFriendship(item, i)}
                    titleMsgRemove="Tem certeza de que deseja desfazer a amizade?"
                    titleModal="Convidar amigo"
                    referenceId="id" 
                    component={ (props) => { return <Invite 
                            ok={(message) => this.add(message)} {...props}    
                        
                            route={item => this.props.route(item)}
                        />
                    }}                  
                />
            </div>
        )
    }
}

export default List;