import React from 'react';
import './count.css';
import {connect} from 'react-redux';

const Count = (props) => {
    if(!props.count || props.count<1){
        return(
            <></>
        );
    }
    return(
        <div className="cartCount">
        <p className="counter">{props.count}</p>
        </div>
    )
}

const mapStateToProps = (state)=>{
    if(state.Reducer.count){
        let count = state.Reducer.count;
        return{'count':count};
    }
    return{};
}

export default connect(mapStateToProps)(Count);