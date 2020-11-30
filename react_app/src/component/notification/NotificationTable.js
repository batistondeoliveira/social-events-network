import React, { Fragment } from 'react';
import AbstractComponent from '../AbstractComponent';

import NotificationType from '../../enumerador/NotificationType';
import NotificationReplyType from '../../enumerador/NotificationReplyType';

class NotificationTable extends AbstractComponent {    
    showBtnReply(item, i) {        
        if(this.props.replyInvitation === undefined)
            return ;

        if(item === undefined)
            return ;                           

        return (
            <Fragment>
                <button 
                    id="dropdownMenuButton"
                    type="button"    
                    className="btn btn-warning dropdown-toggle"
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    style={{width: '36px'}}
                >
                    <i className="fas fa-reply" style={{marginLeft: '-8px'}} />
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">  
                    {
                        NotificationReplyType.getAll().map((value, index) => {
                            return (
                                <a 
                                    key={index} 
                                    className="dropdown-item" 
                                    onClick={() => this.props.replyInvitation(item, value.value, i)}
                                >
                                    {value.description }
                                </a>        
                            )
                        })
                    }                                                      
                </div>
            </Fragment>
        );
    }    

    editarTd(item, i ) {               
        if(item === undefined)
            return ;       

        return (
            <th className="text-right">
                { this.showBtnReply(item, i) }                                                                  
                                   
                {
                    ((this.props.onOpenClick !== undefined)&&((item !== undefined)&&(item.type.toUpperCase() === NotificationType.EVENT.enumName))) &&
                    <Fragment>
                        &nbsp;

                        <button 
                            className="btn btn-info"
                            onClick={() => this.props.onOpenClick(item)}
                            style={{width: '36px'}}
                        >
                            <i className="far fa-eye" style={{marginLeft: '-3px'}} />
                        </button>                
                    </Fragment>                    
                }                
            </th>
        )
    }        

    showField(itemHead, item, i) {                
        if(itemHead.type === 'checked') 
            return (
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={parseInt(item[itemHead.campo], 10) === 1} 
                    onChange={() => this.props.onChange(item, i)}
                />            
            );

        if(itemHead.type === 'enum') 
            return this.props.getEnumName(item[itemHead.campo]);

        return item[itemHead.campo];
    }

    classNameTr(item) {
        if(item.checked === undefined)
            return ;

        return (parseInt(item.checked, 10) === 1 ? 'table-checked' : '');
    }

    render() {
        return (
            <div>                                               
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {this.props.head.map((item, i) => {
                                return (
                                    <th key={i}>{item.nome}</th>
                                )
                            })}

                            <th className="col-md-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(this.props.body) && this.props.body.map((item, i) => {
                            return (
                                <tr key={i} className={this.classNameTr(item)}>
                                    {this.props.head.map((itemHead, i1) => {
                                        return (
                                            <td key={i1}>
                                                {this.showField(itemHead, item, i)}                                                
                                            </td>
                                        )
                                    })}

                                    {this.editarTd(item, i)}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

NotificationTable.defaultProps = {
    codigo: 'id',
    titleModal: 'Novo',
    titleMsgRemove: 'Tem certeza que deseja remover este registro?',
    tituloBtnNovo: 'Novo',
    iconOpenClick: "far fa-eye"
};

export default  NotificationTable;