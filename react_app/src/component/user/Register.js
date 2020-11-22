import React, { Fragment } from 'react';
import AbstractComponent from '../AbstractComponent';
import Input from "../layout/input/Input";
import Preload from '../layout/preload/Preload';
import Form from "../layout/form/Form";
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSucess';
import InputPassword from '../layout/input/InputPassword';
import InputTextArea from '../layout/input/InputTextArea';

import UserService from '../../service/UserService';

class Cadastro extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: '', 
            
            success: '',

            preload: false,                            
            
            errorForm: {                  
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            },                                  
        
            form: {
                id: 0, 
                name: '',
                email: '',
                password: '',
                bio: '',
                profile_picture: '',
                city: '',
                state: '',
                confirm_password: ''                
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
        error.email = '';
        error.password = '';
        error.confirm_password = '';

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
        
        if(!form.email) {
            error.email = "Informe o campo Email";
            showError = true;
        }    
        
        if(!form.password) {
            error.password = "Informe o campo Password";
            showError = true;
        }
        
        if(form.password !== form.confirm_password) {
            error.password = "Senha não confere";
            showError = true;
        }

        if(showError) {
            this.setState({ erroForm: error });

            return;
        }      
        
        return true;
    }    

    onSubmit() {                   
        if(!this.validateForm())
            return ;

        this.setState({
            preload: true,
            btnFinalizar: 'AGUARDE...'
        });
        
        //const form = new FormData(document.getElementById('form'));        

        UserService.save(this.state.form).then(response => {              
            this.setState({
                preload: false,
                success: 'Cadastro realizado com sucesso'                
            });
        }).catch(error => {                 
            this.setState({
                preload: false,
                btnFinalizar: 'FINALIZAR',
                error: this.handlingError(error)
            });            
        });        
    }            

    success() {
        this.setState({success: ''});
        window.location.href = '/admin';
    }

    render () {
        return (      
            <Fragment>
                <div className="col-md-3
                                col-sm-3
                                col-lg-3
                                col-xs-3"/>
                                
                <div className="col-md-6
                                col-sm-6
                                col-lg-6
                                col-xs-6
                                text-center">
                    <Form onSubmit={() => this.onSubmit()} id="form">   
                        <Preload show={this.state.preload} />

                        <ModalAlerta 
                            show={this.state.error !== ''}
                            text={this.state.error}
                            close={() => this.setState({error: ''})} 
                        />

                        <ModalSuccess
                            show={this.state.success !== ''}
                            text={this.state.success}

                            close={() => this.success()}
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
                                id="bio"
                                name="bio" 
                                row="3"                                   
                                value={this.state.form.bio}                        
                                error={this.state.errorForm.bio}                                
                                onChange={e => this.onChange(e)}>
                                Biografia
                            </InputTextArea>                         
                        </div>                        

                        <div className="row"> 
                            <Input
                                md={6}
                                xs={6}
                                sm={6}
                                lg={6}
                                name="cidade"                                    
                                classNameInput="background-transparent"  
                                value={this.state.cidade}                        
                                error={this.state.errorForm.cidade}                             
                            >
                                Cidade
                            </Input>

                            <Input
                                md={6}
                                xs={6}
                                sm={6}
                                lg={6}   
                                classNameInput="background-transparent"                                                                                            
                                name="state"                                    
                                value={this.state.form.state}                        
                                error={this.state.errorForm.state}
                                onChange={e => this.onChange(e)}>
                                Estado
                            </Input>                        
                        </div>        

                        <div className="row"> 
                            <Input
                                md={12}
                                xs={12}
                                sm={12}
                                lg={12}
                                name="email"                                    
                                classNameInput="background-transparent"  
                                value={this.state.form.email}                        
                                error={this.state.errorForm.email}  
                                onChange={e => this.onChange(e)}                           
                            >
                                Email
                            </Input>
                        </div>

                        <div className="row"> 
                            <InputPassword
                                md={6}
                                xs={6}
                                sm={6}
                                lg={6}
                                name="password"                                    
                                classNameInput="background-transparent"  
                                value={this.state.form.password}                        
                                error={this.state.errorForm.password}  
                                onChange={e => this.onChange(e)}                           
                            >
                                Senha
                            </InputPassword>

                            <InputPassword
                                md={6}
                                xs={6}
                                sm={6}
                                lg={6}   
                                classNameInput="background-transparent"                                                                                            
                                name="confirm_password"                                    
                                value={this.state.form.confirm_password}                        
                                error={this.state.errorForm.confirm_password}
                                onChange={e => this.onChange(e)}>
                                Confirmar Senha
                            </InputPassword>                        
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
                </div> 
                
                <div className="col-md-3
                                col-sm-3
                                col-lg-3
                                col-xs-3"/>
            </Fragment>
        )   
    }
}

export default Cadastro;