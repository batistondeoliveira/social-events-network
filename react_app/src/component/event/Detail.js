import React from 'react';
import AbstractComponent from '../AbstractComponent';
import Title from "../layout/title/Title";
import Preload from "../layout/preload/Preload";

import EventService from '../../service/EventService';

class Detail extends AbstractComponent {
    constructor(props) {
        super(props);        

        this.state = {            
            preload: true
        }

    }    

    componentDidMount() {
        const id = this.getUrl('detail', 0);        

        EventService.getById(
            id
        ).then(response => {
            this.setState({body: response.data, preload: false})
        }).catch(() => {
            this.setState({preload: false})
        });
    }    

    render() {
        return (
            <div>
                <Title title="Detalhes do Evento"/>

                <Preload show={this.state.preload} />
                
            </div>
        )
    }
}

export default Detail;