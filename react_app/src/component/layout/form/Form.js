import React from 'react';
import serializar from 'form-serialize';

class Form extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const data = serializar(this.form, { hash: true, empty: true });

        if(this.props.onSubmit !== undefined)
            this.props.onSubmit(data);
    }

    render() {
        return (
            <form
                id={this.props.id}
                className={this.props.className}
                onSubmit={e => this.onSubmit(e) }
                method={"POST"}
                ref={ref => this.form = ref}>
                    {this.props.children}
            </form>
        )
    }
}

export default Form;