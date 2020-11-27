import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Input from "../layout/input/Input";
import Form from "../layout/form/Form";
import ModalAlerta from '../layout/modal/ModalAlerta';
import InputTextArea from '../layout/input/InputTextArea';
import InputDate from '../layout/input/InputDate';
import InputTime from '../layout/input/InputTime';

import EventService from '../../service/EventService';

import { dateFormat } from '../../functions/Format';

class Register extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: '',                   
            
            errorForm: {                  
                name: '',
                date: '',
                time: '',
                place: ''
            },                                  
        
            form: {
                id: 0, 
                name: '',
                description: '',
                date: '',
                time: '',
                place: '',
            },                                               

            preview: false,            
            
            btnFinalizar: 'FINALIZAR'
        }                       
    }    

    onChange(e) {  
        const form = this.state.form;                 
        form[e.target.name] = e.target.value;        
        this.setState({form: form});
    }               

    clearError() {
        let error = this.state.errorForm;

        error.name = '';
        error.description = '';
        error.date = '';
        error.time = '';
        error.place = '';

        this.setState({ errorForm: error });
    }

    validateForm() {        
        this.clearError();
        
        let form = this.state.form;        
        let error = this.state.errorForm;        
        let showError = false;                

        if(!form.name) {
            error.name = "Informe o campo Nome";
            showError = true;
        } 
        
        if(!form.description) {
            error.description = "Informe o campo Descrição";
            showError = true;
        }                      

        if(!form.date) {
            error.date = "Informe o campo Data";
            showError = true;
        }        
        
        if(!form.time) {
            error.password = "Informe o campo hora";
            showError = true;
        }

        if(showError) {
            this.setState({ erroForm: error });

            return;
        }      
        
        return true;
    }    

    onSubmit(data) {                   
        if(!this.validateForm())
            return ;

        this.setState({            
            btnFinalizar: 'AGUARDE...'
        });                

        EventService.save(data).then(response => {            
            this.props.ok({
                id: response.data.id,
                name: response.data.name,
                date: dateFormat(response.data.date),
                time: response.data.time,
                place: response.data.place,
            }, this.props.indice);
        }).catch(error => { 
            if(this.is401Error(error)) {
                this.goLoginArea();
                return ;
            }
                                
            this.setState({                
                btnFinalizar: 'FINALIZAR',
                error: this.handlingError(error)
            });            
        });        
    }                    

    componentDidMount() {
        if(this.props.item !== undefined) {                         
            let form = this.props.item;
            form.date = dateFormat(form.date);

            this.setState({form: form});
        }
    }

    render () {
        return (                  
            <Form onSubmit={(data) => this.onSubmit(data)} id="form">                           
                <ModalAlerta 
                    show={this.state.error !== ''}
                    text={this.state.error}
                    close={() => this.setState({error: ''})} 
                />                

                <input type="hidden" name="id" value={this.state.form.id}/>                
                                
                <div className="row">                            
                    <Input
                        md={12}
                        xs={12}
                        sm={12}
                        lg={12}                                    
                        classNameInput="background-transparent"  
                        id="name"
                        name="name"                        
                        value={this.state.form.name}                        
                        error={this.state.errorForm.name}                                
                        onChange={e => this.onChange(e)}>
                        Nome
                    </Input>  
                </div>

                <div className="row">
                    <InputTextArea
                        md={12}
                        xs={12}
                        sm={12}
                        lg={12}
                        classNameInput="background-transparent"  
                        id="description"
                        name="description" 
                        row="3"                                   
                        value={this.state.form.description}                        
                        error={this.state.errorForm.description}                                
                        onChange={e => this.onChange(e)}>
                        Descrição
                    </InputTextArea>                         
                </div>                        

                <div className="row"> 
                    <InputDate
                        md={6}
                        xs={6}
                        sm={6}
                        lg={6}
                        name="date"                                    
                        classNameInput="background-transparent"  
                        value={this.state.form.date}                        
                        error={this.state.errorForm.date}                             
                        onChange={(e) => this.onChange(e)}
                    >
                        Data
                    </InputDate>

                    <InputTime
                        md={6}
                        xs={6}
                        sm={6}
                        lg={6}   
                        classNameInput="background-transparent"                                                                                            
                        name="time"                                    
                        value={this.state.form.time}                        
                        error={this.state.errorForm.time}
                        onChange={e => this.onChange(e)}>
                        Hora
                    </InputTime>                        
                </div>        

                <div className="row"> 
                    <Input
                        md={12}
                        xs={12}
                        sm={12}
                        lg={12}
                        name="place"                                    
                        classNameInput="background-transparent"  
                        value={this.state.form.place}                        
                        error={this.state.errorForm.place}  
                        onChange={e => this.onChange(e)}                           
                    >
                        Local
                    </Input>
                </div>                        

                <div className="form-group mt-4 mb-0">
                    <button 
                        type="submit"
                        className="btn btn-success btn-lg btn-block"                         
                    >
                        Salvar                        
                    </button>
                </div>                                                                              
            </Form>            
        )   
    }
}

export default Register;