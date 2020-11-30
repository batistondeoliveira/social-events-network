import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pagesArray: []
        }
        
        this.qtdPages = 0;

        const value = (props.totalRecords / props.pagination);
        var precision = parseInt(value, 10);
        const scale = (value - precision);

        if(scale > 0)
            precision++;

        this.qtdPages = precision;

        let myArray = [];

        for(var cont = 0; cont < this.qtdPages; cont++) 
            myArray.push(cont);           

        this.state.pagesArray = myArray;
    }

    pages() {                
        return (        
            this.state.pagesArray.map((item, i) => {            
                return (
                    <li key={i} className="page-item">
                        <a className="page-link" onClick={() => this.props.onClick(item+1)}>
                            {item+1}           
                        </a>
                    </li>
                )        
            })                
        )
    }

    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" aria-label="Previous" onClick={() => this.props.onClick(1)}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    
                    {this.pages()}                    

                    <li className="page-item">
                        <a className="page-link" aria-label="Next" onClick={() => this.props.onClick(this.qtdPages)}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination;