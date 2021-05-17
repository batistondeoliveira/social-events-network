import React from 'react';
import AbstractComponent from '../../AbstractComponent';
import {Modal} from 'react-bootstrap';

import { dateFormat } from '../../../functions/Format';

class Table extends AbstractComponent {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalCadastro: false,            
            tituloCadastro: this.props.titleModal
        }
    }

    validarEditar() {
        return (
            this.props.remover !== undefined || 
            this.props.editar !== undefined ||             
            this.props.onOpenClick !== undefined            
        );
    }

    editarTd(item, i ) {
        if(!this.validarEditar()) {
            return;
        }

        return (
            <th className="text-right">
                { 
                    this.props.onOpenClick !== undefined &&
                    <button className="btn btn-info"
                        onClick={() => this.props.onOpenClick(item)}>
                        <i className={this.props.iconOpenClick} />
                    </button>
                }                                

                &nbsp;

                { 
                    this.props.editar !== undefined &&
                    <button className="btn btn-primary"
                        onClick={() => this.setState({modalCadastro: true, tituloCadastro: 'Editar', editarItem: item, editarIndice: i})}>
                        <i className="fa fa-wrench" />
                    </button>
                }

                &nbsp;

                { 
                    this.props.remover !== undefined &&
                    <button className="btn btn-danger" 
                        onClick={() => this.setState({modal: true, removerItem: item, removerIndice: i})}>
                        <i className="fa fa-times" />
                    </button>
                }
            </th>
        )
    }

    remover () {
        this.props.remover(this.state.removerItem, this.state.removerIndice);
        this.setState({modal: false})
    }

    cadastro() {        
        if(this.props.cadastro === true) 
            return this.props.component({item: this.state.editarItem, indice: this.state.editarIndice});        
    }    

    fecharCadastro() {
        this.setState({modalCadastro: false})
    }

    showField(itemHead, item, i) {
        if(itemHead.type === 'date') 
            return dateFormat(item[itemHead.campo]);    
        
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
                <Modal
                    backdrop={'static'}
                    show={this.state.modalCadastro}
                    onHide={() => this.setState({ modalCadastro: false })}>

                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.tituloCadastro}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.cadastro()}
                    </Modal.Body>

                </Modal>

                <Modal
                    show={this.state.modal}
                    onHide={() => this.setState({ modal: false })}>

                    <Modal.Body>
                        <Modal.Title>{this.props.titleMsgRemove}</Modal.Title>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-primary"
                                onClick={() => this.setState({ modal: false })}
                                style={{marginRight: '10px'}}>Não</button>
                        <button className="btn btn-danger"
                                onClick={() => this.remover()}>Sim</button>

                    </Modal.Footer>
                </Modal>

                {
                    this.props.cadastro &&
                    <button className="btn btn-primary" style={{marginBottom: '15px'}}
                            onClick={() => this.setState({modalCadastro: true, tituloCadastro: this.props.titleModal, editarItem: undefined, editarIndice: undefined})} >
                        <i className="fa fa-plus"/> {this.props.tituloBtnNovo}
                    </button>
                }                

                {
                    this.props.button !== undefined &&
                    this.props.button()
                }

                <table className="table table-striped">
                    <thead>
                        <tr>
                            {this.props.head.map((item, i) => {
                                return (
                                    <th key={i}>{item.nome}</th>
                                )
                            })}

                            {this.validarEditar() && <th className="col-md-2" />}
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

Table.defaultProps = {
    codigo: 'id',
    titleModal: 'Novo',
    titleMsgRemove: 'Tem certeza que deseja remover este registro?',
    tituloBtnNovo: 'Novo',
    iconOpenClick: "far fa-eye"
};

export default  Table;