import React from 'react';

export const CartPayButton = (props) =>{
    var clas='';
    if(!props.count){
        clas='disable';
    }
    return(
        <React.Fragment>
            <button className={clas}>Pay</button>
        </React.Fragment>
    );
}