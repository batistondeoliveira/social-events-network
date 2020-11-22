import React from 'react';

class NotFound extends React.Component {
    onClick() {
        window.location.href = '/';
    }   

    render() {
        return(               
            <div id="layoutError">
                <div id="layoutError_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="text-center mt-4">
                                        <img className="mb-4 img-error" src="/assets/img/error-404-monochrome.svg" alt="url not found" />
                                        
                                        <p className="lead">
                                            A URL requisitada não foi encontrada neste servidor.
                                        </p>

                                        <a onClick={() => this.onClick()} style={{cursor: 'pointer'}}>
                                            <i className="fas fa-arrow-left mr-1">

                                            </i>

                                            Voltar
                                        </a>
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

export default NotFound;