import React from 'react';
import LoginContent from './LoginContent';

import { route } from '../../functions/Route';

class Login extends React.Component {                          
    onClick() {
        this.props.route(route('', '', '/register'));   
    }

    render() {
        return(
            <div id="layoutAuthentication">                  
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">
                                                Login
                                            </h3>
                                        </div>

                                        <div className="card-body">
                                            <LoginContent />
                                        </div>

                                        <div className="card-footer text-center">
                                            <div className="small">
                                                <a onClick={() => this.onClick()}>
                                                    Cadastre-se? Inscreva-se!
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>                
            </div>
        )
    }
}

export default Login;