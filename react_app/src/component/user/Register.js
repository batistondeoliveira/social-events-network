import React, { Fragment } from 'react';
import AbstractComponent from '../AbstractComponent';
import Input from "../layout/input/Input";
import Form from "../layout/form/Form";
import ModalAlerta from '../layout/modal/ModalAlerta';
import ModalSuccess from '../layout/modal/ModalSuccess';
import InputPassword from '../layout/input/InputPassword';
import InputTextArea from '../layout/input/InputTextArea';
import ProfilePicture from './ProfilePicture';

import UserService from '../../service/UserService';
import config from '../../Config';

class Cadastro extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: '', 
            
            success: '',            
            
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
            btnFinalizar: 'AGUARDE...'
        });
        
        let form = new FormData(document.getElementById('form'));                

        UserService.save(
            form
        ).then(() => {              
            this.setState({                
                success: 'Cadastro realizado com sucesso'                
            });
        }).catch(error => {                 
            this.setState({                
                btnFinalizar: 'FINALIZAR',
                error: this.handlingError(error)
            });            
        });        
    }            

    success() {
        this.setState({success: ''});
        this.props.route(this.goAdminArea());
    }

    upImg() {
        var el = document.getElementById("profile_picture");

        var form = this.state.form;

        form.profile_picture = el.value;                        

        this.setState({ form: form });
    }

    render () {
        return (                                     
            <Form id="form" onSubmit={(e) => this.onSubmit(e)}> 
                <input type="hidden" name="id" defaultValue={this.state.form.id} />                
                <input type="hidden" name="profile_picture" defaultValue={this.state.form.profile_picture} />
                <input type="hidden" name="bio" defaultValue={this.state.form.bio} />
                <input type="hidden" name="city" defaultValue={this.state.form.city} />
                <input type="hidden" name="state" defaultValue={this.state.form.state} />
                <input type="hidden" name="email" defaultValue={this.state.form.email} />                    
                <input type="hidden" name="password" defaultValue={this.state.form.password}/> 

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

                <div className="col-md-9
                                col-sm-9
                                col-lg-9
                                col-xs-9
                                text-center">
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
                            defaultValue={this.state.form.name}                        
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
                            defaultValue={this.state.form.bio}                        
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
                            name="city"                                    
                            classNameInput="background-transparent"  
                            value={this.state.city}                        
                            defaultValue={this.state.city}                        
                            error={this.state.errorForm.city}                             
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
                            defaultValue={this.state.form.state}                        
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
                            defaultValue={this.state.form.email}                        
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
                            defaultValue={this.state.form.password}                        
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
                            defaultValue={this.state.form.confirm_password}                        
                            error={this.state.errorForm.confirm_password}
                            onChange={e => this.onChange(e)}>
                            Confirmar Senha
                        </InputPassword>                        
                    </div>                                           
                </div>

                <ProfilePicture   
                    md={3}
                    xs={3}
                    sm={3}
                    lg={3}                                            
                    imagem={config.urlImg + this.state.form.profile_picture}

                    upImg={() => this.upImg()}
                    changeOnLoad={() => this.changeOnLoad()}
                />

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

export default Cadastro;