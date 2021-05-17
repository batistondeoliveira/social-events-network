import React from 'react';
import config from '../../Config';
import AbstractComponent from '../AbstractComponent';

class ProfilePicture extends  AbstractComponent {
    constructor(props) {
        super(props);

        this.profile_picture = '';       

        this.state = {
            preview: false            
        }               

        this.state.preview = (this.profile_picture != null && this.profile_picture !== '' && this.profile_picture !== undefined);
    }

    upload() {        
        document.getElementById('profile_picture').click();
    }

    loadFile() {
        const reader = new FileReader();
        const file = document.getElementById("profile_picture");

        reader.onload = function (e) {            
            document.getElementById("preview").src = e.target.result;
        };

        reader.readAsDataURL(file.files[0]);
        this.setState({ preview: true });        
    }    

    render () {
        return (
            <div className="row">
                <div className="col-md-2
                                col-sm-2
                                col-lg-2
                                col-xs-2">
                </div>

                <div className="col-md-12" style={{ textAlign: "center", marginBottom: '20px' }}>
                    <input type="file" name="profile_picture" id="profile_picture" className="hide" onChange={e => this.loadFile(e)} />

                    {
                        !this.state.preview &&
                        <a onClick={e => this.upload(e)}>
                            <img 
                                src={config.urlImg + 'login.png'} 
                                style={{ width: '8em', height: '8em'}}
                                alt="Foto Perfil" 
                            />
                        </a>
                    }

                    {
                        this.state.preview &&
                        <a onClick={e => this.upload(e)}>
                            <img
                                id="preview"
                                className={"img-preview"}
                                alt="Foto de Perfil"
                                style={{ width: '8em', height: '8em', borderRadius: '50px'}}
                                src={this.profile_picture}
                                onLoad={() => this.props.upImg()}
                            />
                        </a>
                    }
                </div>
            </div >
        )
    }
}

export default ProfilePicture;