import React,{Component} from 'react';
import '../Subscriptions/subs.css';
import {Store} from '../../Models/Store';

export default class Counter extends Component{
    constructor(props){
        super(props);
        this.props=props;
    }
    addSub(event){
        if(event.target.getAttribute('myvalue')==='add'){
            var payload={'Product':this.props.Obj};
            Store.dispatch({type:'add',payLoad:payload});
            this.props.changed();
        }
        else{
            var payload={'Product':this.props.Obj};
            Store.dispatch({type:'sub',payLoad:payload});
            this.props.changed();
        }
    }
    render(){
        return(
            <div>
                <button className="addsub" myvalue="sub" onClick={this.addSub.bind(this)}>-</button>
                <p className="midaddsub">{this.props.quant}</p>
                <button className="addsub" myvalue="add" onClick={this.addSub.bind(this)}>+</button>
            </div>
        )
    }
}