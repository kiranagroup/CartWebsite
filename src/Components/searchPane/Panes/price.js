import React,{Component} from 'react';
import './panes.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import {connect} from 'react-redux';
import {Store} from '../../../Models/Store';

class Price extends Component{
    constructor(){
        super();
        this.got=false;
        this.price=[];
    }
    componentDidMount(){
        fetch('https://raw.githubusercontent.com/kiranagroup/CartWebsite/master/src/assets/completeResponseFrom_requestCollection')
        .then(response=>{
            response.json()
            .then(data=>{
                this.got=true;
                for(let i=0;i<data.aggregations.by_cluster.buckets.length;i++){
                    if(data.aggregations.by_cluster.buckets[i].key==this.props.category){
                        this.price=data.aggregations.by_cluster.buckets[i].by_price.values;
                    }
                }
                this.setState({});
            })
            .catch(err=>
                console.log(err))})
        .catch(err=>
                console.log(err));
    }
    editPrice(low,high){
        var price={
            low:low,
            high:high
        };
        Store.dispatch({'type':'price','payLoad':price});
    }
    render(){
        while(!this.got){
            return(
                <img src={require('../../../images/paneloader.gif')} alt="Loading.." className="paneload"/>
            )
        }
        return(
            <div className="margBottom">
                <h5 style={{fontWeight:700}}>Price Range</h5>
                {/* {this.price.map((element,index)=>{
                    return(
                        <div key={element.key}>
                            <p onClick={
                                this.editPrice.bind(this,element.key)
                            } className={this.props.prices.indexOf(element.key)==-1?'pane':'selected pane'}>{element.key}</p>
                        </div>
                    )
                })} */}
                <p onClick={this.editPrice.bind(this,null,this.price['25.0'])} className={this.props.prices.indexOf(this.price['25.0'])==-1?'pane':'selected pane'}>{this.price['25.0']}</p>
                <p onClick={this.editPrice.bind(this,this.price['25.0'],this.price['50.0'])} className={this.props.prices.indexOf(this.price['50.0'])==-1?'pane':'selected pane'}>{this.price['50.0']}</p>
                <p onClick={this.editPrice.bind(this,this.price['50.0'],this.price['75.0'])} className={this.props.prices.indexOf(this.price['75.0'])==-1?'pane':'selected pane'}>{this.price['75.0']}</p>
                <p onClick={this.editPrice.bind(this,this.price['99.9'],null)} className={this.props.prices.indexOf(this.price['99.9'])==-1?'pane':'selected pane'}>{this.price['99.9']}</p>    
            </div>
        )
    }
} 

const mapStateToProps = (state)=>{
    if(state.Reducer.prices){
        let price = state.Reducer.prices;
        let current = state.Reducer.pcount;
        return{prices:price,pcount:current}
    }
    return {prices:[]}
}

export default connect(mapStateToProps)(Price);