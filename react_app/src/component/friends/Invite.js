import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Input from "../layout/input/Input";
import Button from '../layout/button/Button';
import Alerta from '../layout/alerta/Alerta';
import Form from '../layout/form/Form';

import InviteFriendshipService from '../../service/InviteFriendshipService';

class Invite extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: '',                   
            
            errorForm: {                  
                email: ''                
            },                                  
        
            form: {
                email: '',
            },                                               

            preview: false,            
            
            btnFinalizar: 'CONVIDAR'            
        }                       
    }    

    onChange(e) {  
        const form = this.state.form;                 
        form[e.target.name] = e.target.value;        
        this.setState({form: form});
    }               

    clearError() {
        let error = this.state.errorForm;

        error.email = '';        

        this.setState({ errorForm: error });
    }

    validateForm() {        
        this.clearError();
        
        let form = this.state.form;        
        let error = this.state.errorForm;        
        let showError = false;                

        if(!form.email) {
            error.name = "Informe o campo Email";
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

        InviteFriendshipService.invite(
            data.email
        ).then(response => {            
            this.props.ok(response.data, this.props.indice);

            this.setState({ btnFinalizar: 'CONVIDAR' });
        }).catch(error => { 
            if(this.is401Error(error)) {
                this.goLoginArea();
                return ;
            }
                                
            this.setState({                
                btnFinalizar: 'CONVIDAR',
                error: this.handlingError(error)
            });            
        });        
    }                        

    render () {
        return (                  
            <Form onSubmit={(data) => this.onSubmit(data)} id="form">                           
                <Alerta 
                    show={this.state.error !== ''}
                    error={this.state.error} 
                    timeOut={5}
                    
                    onTimeOut={() => this.setState({error: ''})}
                    close={() => this.setState({error: ''})}
                />                                            
                                                           
                <Input
                    md={12}
                    xs={12}
                    sm={12}
                    lg={12}                                    
                    classNameInput="background-transparent"  
                    id="email"
                    name="email"                        
                    value={this.state.form.email}                        
                    error={this.state.errorForm.email}                                
                    onChange={e => this.onChange(e)}>
                    Email
                </Input>

                <Button
                    md={12}
                    xs={12}
                    sm={12}
                    lg={12}                                    
                    classNameInput="btn btn-success"                      
                    type="submit"
                    disabled={this.state.btnFinalizar !== 'CONVIDAR'}
                >
                    {this.state.btnFinalizar}
                </Button>
            </Form>            
        )   
    }
}

export default Invite;