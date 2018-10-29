import React from 'react';
import './cart.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export const CartTotal = (props) =>{
    var totalAmount=0;
    if(props.items){
        for(let i=0;i<props.items.length;i++){
            totalAmount+=(props.items[i].value*parseInt(props.items[i].Product.Price.substring(1,props.items[i].Product.Price.length)));
        }
    }
    return(
        <React.Fragment>
            <p className="total col-sm-6 col-6">Total : </p>
            <p className="totalvalue col-sm-6 col-6">&#8377;{totalAmount}</p>
        </React.Fragment>
    );
}