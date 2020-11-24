import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Preload from "../layout/preload/Preload";
import ModalAlerta from '../layout/modal/ModalAlerta';

import EventService from '../../service/EventService';

class Detail extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.state = {            
            preload: true,

            form: {},

            error: ''
        }

    }    

    onClick() {
        this.setState({error: ''});
        window.location.href = '/';
    }

    componentDidMount() {
        const id = this.getUrl('detail', 0);        

        EventService.getById(
            id
        ).then(response => {
            this.setState({form: response.data, preload: false})
        }).catch(error => {
            this.setState({preload: false, error: this.handlingError(error)})
        });
    }    

    render() {
        return (
            <div>
                <Title title="Detalhes do Evento"/>

                <Preload show={this.state.preload} />

                <ModalAlerta
                    show={this.state.error !== ''}
                    text={this.state.error}

                    close={() => this.onClick()}
                />
                
                <div className="row">    
                    <div className="col-md-12
                                    col-sm-12
                                    col-lg-12
                                    col-xs-12">                        
                        <label>
                            Nome:
                        </label>

                        &nbsp;

                        {this.state.form.name}                                        
                    </div>
                </div>

                <div className="row">  
                    <div className="col-md-12
                                    col-sm-12
                                    col-lg-12
                                    col-xs-12">                          
                        <label>
                            Descrição:
                        </label>

                        &nbsp;

                        {this.state.form.description}                    
                    </div>
                </div>                        

                <div className="row">                            
                    <div className="col-md-6
                                    col-sm-6
                                    col-lg-6
                                    col-xs-6">
                        <label>
                            Data:
                        </label>

                        &nbsp;

                        {this.state.form.date}
                    </div>

                    <div className="col-md-6
                                    col-sm-6
                                    col-lg-6
                                    col-xs-6">
                        <label>
                            Hora:
                        </label>

                        &nbsp;

                        {this.state.form.time}
                    </div>
                </div>                                          

                <div className="form-group mt-5 mb-0">
                    <button 
                        type="submit"
                        className="btn btn-light btn-lg btn-block"
                        onClick={() => this.onClick()}                         
                    >
                        Voltar                        
                    </button>
                </div> 
            </div>
        )
    }
}

export default Detail;