const config = {};

config.urlApi = 'http://localhost/social-events-network/api/';
config.urlImg = 'http://localhost/social-events-network/react_app/public/img/';

if (process.env.NODE_ENV === "production") {
    config.urlApi = 'https://elielbatiston.life/api/';
    config.urlImg = 'https://elielbatiston.life/img/';   
}

export default config;