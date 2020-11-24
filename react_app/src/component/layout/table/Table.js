import React from 'react';
import AbstractComponent from '../../AbstractComponent';
import {Modal} from 'react-bootstrap';

class Table extends AbstractComponent {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalCadastro: false,            
            tituloCadastro: 'Novo'
        }
    }

    validarEditar() {
        return (this.props.remover !== undefined || this.props.editar !== undefined || this.props.onOpenClick !== undefined);
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
                        onClick={() => this.props.onOpenClick(item[this.props.referenceId])}>
                        <i className="far fa-eye"/>
                    </button>
                }

                { 
                    this.props.editar !== undefined &&
                    <button className="btn btn-primary"
                        onClick={() => this.setState({modalCadastro: true, tituloCadastro: 'Editar', editarItem: item, editarIndice: i})}>
                        <i className="fa fa-wrench" />
                    </button>
                }

                { 
                    this.props.remover !== undefined &&
                    <button className="btn btn-danfer"
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
        if(this.props.cadastro === true) {
            return this.props.component({item: this.state.editarItem, indice: this.state.editarIndice});
        }
    }    

    showField(item, itemHead) {
        if(itemHead.type === 'date')
            return this.dateFormat(item[itemHead.campo]);

        return item[itemHead.campo];
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
                        <Modal.Title>Tem certeza que deseja remover este registro?</Modal.Title>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btnDefault"
                                onClick={() => this.setState({ modal: false })}
                                style={{marginRight: '10px'}}>Não</button>
                        <button className="btnDanger"
                                onClick={() => this.remover()}>Sim</button>

                    </Modal.Footer>
                </Modal>

                {
                    this.props.cadastro &&
                    <button className="btnPrimary" style={{marginBottom: '15px'}}
                            onClick={() => this.setState({modalCadastro: true, tituloCadastro: 'Novo', editarItem: undefined, editarIndice: undefined})} >
                        <i className="fa fa-plus"/> Novo
                    </button>
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
                            <tr key={i}>
                                {this.props.head.map((itemHead, i) => {
                                    return (
                                        <td key={i}>
                                            {this.showField(item, itemHead)}
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
    codigo: 'id'
};

export default  Table;