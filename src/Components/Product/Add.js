import React,{Component} from 'react';
import '../Subscriptions/subs.css';
import {Store} from '../../Models/Store';

export default class Add extends Component{
    constructor(props){
        super(props);
        this.props=props;
    }
    addQuantity(){
        var payload = {'Product':this.props.Obj};
        Store.dispatch({type:'add',payLoad:payload});
        this.props.changed();
    }
    render(){
        return(
            <button className="add" onClick={this.addQuantity.bind(this)}>Add</button>
        )
    }
}
