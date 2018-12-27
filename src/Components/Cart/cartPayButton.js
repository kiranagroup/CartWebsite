import React from 'react';
import {Store} from '../../Models/Store';

export const CartPayButton = (props) =>{
    var clas='';
    if(!props.count){
        clas='disable';
    }
    return(
        <React.Fragment>
            <button onClick={()=>{
                Store.dispatch({'type':'pay','payLoad':true});
            }} className={clas}>Pay</button>
        </React.Fragment>
    );
}