import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Form from '../layout/form/Form';
import Input from '../layout/input/Input';
import InputPassword from '../layout/input/InputPassword';
import ModalAlerta from '../layout/modal/ModalAlerta';

import UserService from '../../service/UserService';
import AuthenticateService from '../../service/AuthenticateService';

class LoginContent extends AbstractComponent {   
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            },

            errorForm: {
                email: '',
                password: ''
            },

            error: '',

            btnLogin: 'LOGIN'
        }
    }       

    onChange(e) {
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form: form});
    }

    clearError() {
        let errorForm = this.state.errorForm;

        errorForm.email = '';
        errorForm.password = '';

        this.setState({errorForm: errorForm});
    }

    validateForm() {
        this.clearError();

        let form = this.state.form;
        let errorForm = this.state.errorForm;
        let showError = false;

        if(!form.email) {
            errorForm.email = 'Informe o campo Email';
            showError = true;
        }

        if(!form.password) {
            errorForm.password = 'Informe o campo Senha';
            showError = true;
        }

        if(showError) {
            this.setState({ erroForm: errorForm });

            return;
        }      
        
        return true;
    }

    onSubmit() {                        
        if(!this.validateForm())             
            return ;        

        this.setState({btnLogin: 'AGUARDE...'});
        
        UserService.login(            
            this.state.form.email,
            this.state.form.password
        ).then(resposta => {                               
            AuthenticateService.login(
                resposta.data,
                this.state.form.email                
            );
        }).catch(error => {
            this.setState({
                btnLogin: 'LOGIN', 
                error: this.handlingError(error)
            });
        });
    }        

    render() {
        return(                                                     
            <Form onSubmit={(e) => this.onSubmit(e)} id="form">    
                <ModalAlerta
                    show={this.state.error !== ''}
                    text={this.state.error}

                    close={() => this.setState({error: ''})}
                />

                <Input
                    md={12}
                    xs={12}
                    sm={12}
                    lg={12}
                    id="email"
                    name="email"                         
                    value={this.state.form.email}                    
                    error={this.state.errorForm.email}                                
                    onChange={e => this.onChange(e)}>
                    Email
                </Input>

                <InputPassword
                    md={12}
                    xs={12}
                    sm={12}
                    lg={12}
                    id="password"
                    name="password" 
                    value={this.state.form.password}                    
                    error={this.state.errorForm.password}                                
                    onChange={e => this.onChange(e)}>
                    Senha
                </InputPassword>
                                
                <div className="col-md-12                                 
                                col-sm-12                                                
                                col-lg-12                                                
                                col-xs-12
                                d-flex
                                align-items-center
                                justify-content-between 
                                mt-4 
                                mb-0">                    
                    <button 
                        id="btnLogin"
                        type="submit"
                        className="btn btn-primary"                                                         
                        disabled={this.state.btnLogin !== 'LOGIN'}
                    >
                        {this.state.btnLogin}
                    </button>
                </div>
            </Form>                                 
        )
    }
}

export default LoginContent;