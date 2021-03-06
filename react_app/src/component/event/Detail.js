import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Preload from "../layout/preload/Preload";
import ModalAlerta from '../layout/modal/ModalAlerta';

import EventService from '../../service/EventService';

import {dateFormat} from '../../functions/Format';

class Detail extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.state = {            
            preload: false,            

            form: {},

            error: ''
        }

        this.id = '';
        
        if(props.match !== undefined)
            this.id = props.match.params.id;
    }    

    onClick() {
        if(!this.id) {
            this.props.close();

            return ;        
        }

        this.setState({error: ''});
        window.location.href = '/';
    }    

    componentDidMount() {
        if(this.props.detail !== undefined) {
            this.setState({form: this.props.detail});

            return;
        }            
        
        if(this.id === '')
            return;

        this.setState({ preload: true });

        EventService.getById(
            this.id
        ).then(response => {
            this.setState({form: response.data, preload: false})
        }).catch(error => {
            this.setState({preload: false, error: this.handlingError(error)})
        });
    }    

    render() {
        return (
            <div>
                {
                    this.id &&
                    <Title title="Detalhes do Evento"/>
                }   

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

                        {dateFormat(this.state.form.date)}
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

                <div className="row">                            
                    <div className="col-md-12
                                    col-sm-12
                                    col-lg-12
                                    col-xs-12">
                        <label>
                            Local:
                        </label>

                        &nbsp;

                        {this.state.form.place}
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