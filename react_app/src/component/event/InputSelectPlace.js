import React, { Fragment } from 'react';
import AbstractComponent from '../AbstractComponent';
import Preload from '../layout/preload/Preload';
import InputSelect from '../layout/input/InputSelect';

import EventService from '../../service/EventService';


class InputSelectPlace extends AbstractComponent {
    constructor(props) {
        super(props);  
        
        this.state = {
            list: [{value: 0, description: 'Selecione'}], 
            preload: true           
        }        
    }    

    onChangeSelect(input) {        
        if (this.props.onChange !== undefined) {
            this.props.onChange(input);
        }
    }
    
    componentDidMount() {         
        EventService.placeList().then(response => { 
            const list = [{value: 0, description: 'Selecione'}];

            response.data.map(item => {
                list.push({
                    value: item.place, 
                    description: item.place, 
                    selected: item.place === this.props.editarId
                })
                
                return item;
            });            

            this.setState({list: list, preload: false});            
        }).catch(error => {                        
            this.setState({
                preload: false,
                error: this.handlingError(error)
            });            
        });        
    }            

    render() {
        return (    
            <Fragment>
                <Preload exibir={this.state.preload} />

                <InputSelect 
                    md={this.props.md} 
                    xs={this.props.xs} 
                    sm={this.props.sm} 
                    lg={this.props.lg} 
                    classNameInput={this.props.classNameInput}                        
                    name={this.props.name}                                                         
                    id={this.props.id} 
                    options={this.state.list}                            
                    value={this.props.value}                             
                    defaultValue={this.props.defaultValue}
                    error={this.props.error}
                    onChange={e => this.onChangeSelect(e)}
                >                            
                    Lugar 
                </InputSelect>            
            </Fragment>
        );
    }
}

export default InputSelectPlace;
