import React,{Component} from 'react';
import '../Subscriptions/subs.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Add from '../Product/Add';
// import {Store} <f></f>rom '../../Models/Store';
import Counter from '../Product/Counter';
import {connect} from 'react-redux';

class SearchProduct extends Component{
    constructor(props){
        super(props);
        this.items=this.props.items;
        // this.count=this.props.counter;
        this.countCheck=0;
        this.state={props:this.props};
    }
    refresh(){
        this.setState({});
    }
    render(){
        this.countCheck=0;
        return(
            <div className="row">
                {this.props.items.map(Obj=>{
                    if(this.countCheck===this.props.counter){
                        return;
                    }
                    var button = <Add Obj={Obj._source} changed={this.refresh.bind(this)}></Add>;
                    if(this.props.added){
                    for(var i=0;i<this.props.added.length;i++){
                            if(Obj._source["Product ID"]===this.props.added[i].Product["Product ID"]){
                                button=<Counter Obj={Obj._source} quant={this.props.added[i].value} changed={this.refresh.bind(this)}></Counter> 
                            }
                        }
                    }
                    this.countCheck++;
                    return(
                        <div  className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="box prod">
                                <div className="imgbox">
                                    <img src={Obj._source["Pic URL"]} alt=""/>
                                </div>
                                <div className="textbox prodtext">
                                    <h5 className="gcol">{Obj._source.Brand}</h5>
                                    <p className="extra">{Obj._source.Description}</p>
                                    <p className="gcol">{Obj._source.Weight || 'Quantity'}</p>
                                    <div className="row last">
                                        <p className="col-sm-4 col-4 highlight">{Obj._source.Price || 'MRP'}</p>
                                        <div className="col-sm-8 col-8 rightIt">
                                            {button}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    if(state.Reducer.added){
        let curr={};
        if(state.Reducer.current){
            curr=state.Reducer.current;
        }
        let add = state.Reducer.added;
        return {added:add,current:curr};
    }
    return {};
}

export default connect(mapStateToProps)(SearchProduct);