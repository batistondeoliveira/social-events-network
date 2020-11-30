import React, {Fragment} from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import NotificationTable from "./NotificationTable";
import Preload from "../layout/preload/Preload";
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';
import ModalDetail from '../event/ModalDetail';

import NotificationService from '../../service/NotificationService';

import NotificationType from '../../enumerador/NotificationType';

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
                {nome: 'Email', campo: 'email'},
                {nome: 'Tipo', campo: 'type', type: "enum", function: (item) => this.row(item)},
            ],

            body: [],

            preload: true,

            error: '',

            success: '',

            detail: undefined
        }        
    }                 

    row(item) {        
        if(item.type.toUpperCase() === NotificationType.FRIENDSHIP.enumName)
            return ;

        return (
            <Fragment>
                <br/>

                <label>
                    Evento: 
                </label>

                &nbsp;

                { item.event + ' / ' }
                
                <label>
                    Local:
                </label>

                &nbsp;
                
                { item.place}
            </Fragment>
        )
    }

    componentDidMount() {        
        NotificationService.notification(
            
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

    replyInvitation(item, value, index) {
        this.setState({preload: true});

        NotificationType.get(item.type).reply(
            item,
            value
        ).then(response => {
            let body = this.state.body;            

            body.splice(index, 1);

            this.setState({
                body: body,
                success: response.data, 
                preload: false
            })

            this.props.updateBadge();
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

                <ModalDetail
                    show={this.state.detail !== undefined}
                    detail={this.state.detail}
                    
                    close={() => this.setState({detail: undefined})}
                />

                <Title title="Notificações"/>

                <Preload show={this.state.preload} />                                              

                <NotificationTable
                    ref={ref => this.table = ref}
                    head={this.state.head}
                    body={this.state.body}  
                                          
                    replyInvitation={(item, value, index) => this.replyInvitation(item, value, index)}
                    getEnumName={(enumName) => NotificationType.get(enumName).description}
                    onOpenClick={(item) => this.setState({detail: item})}                    
                />
            </div>
        )
    }
}

export default List;