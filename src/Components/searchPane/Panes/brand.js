import React,{Component} from 'react';
import './panes.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import {connect} from 'react-redux';
import {Store} from '../../../Models/Store';

class Brand extends Component{
    constructor(){
        super();
        this.got=false;
        this.brand=[];
        this.currentShow=4;
        // this.bran=[];
    }
    componentDidMount(){
        fetch('https://raw.githubusercontent.com/kiranagroup/CartWebsite/master/src/assets/completeResponseFrom_requestCollection')
        .then(response=>{
            response.json()
            .then(data=>{
                this.got=true;
                for(let i=0;i<data.aggregations.by_cluster.buckets.length;i++){
                    if(data.aggregations.by_cluster.buckets[i].key==this.props.category){
                        this.brand=data.aggregations.by_cluster.buckets[i].by_brand.buckets;
                        if(this.brand.length<5){
                            this.currentShow=this.brand.length;
                        }
                    }
                }
                this.setState({});
            })
            .catch(err=>
                console.log(err))})
        .catch(err=>
                console.log(err));
    }
    changeCount(){
        this.currentShow=(this.currentShow==this.brand.length)?4:this.brand.length;
        this.setState({});
    }
    editBrand(brand){
        Store.dispatch({'type':'brand','payLoad':brand});
    }
    render(){
        while(!this.got){
            return(
                <img src={require('../../../images/paneloader.gif')} alt="Loading.." className="paneload"/>
            )
        }
        if(this.brand.length>5 && this.currentShow<=4){
            var showMore= <p className="more pane" onClick={this.changeCount.bind(this)}>Show More <i className="fa fa-caret-down" aria-hidden="true"></i></p> 
        }
        else if(this.currentShow==this.brand.length && this.brand.length>5){
            var showMore= <p className="more pane" onClick={this.changeCount.bind(this)}>Show Less <i className="fa fa-caret-up" aria-hidden="true"></i></p>
        }
        return(
            <div className="margBottom">
                <h5 style={{fontWeight:700}}>Related Brands</h5>
                {this.brand.map((element,index)=>{
                    if(index>this.currentShow){
                        return;
                    }
                    return(
                        <div key={element.key}>
                            <p onClick={
                                this.editBrand.bind(this,element.key)
                            } className={this.props.brands.indexOf(element.key)==-1?'pane':'selected pane'}>{element.key}</p>
                        </div>
                    )
                })}
                {showMore}
            </div>
        )
    }
} 

const mapStateToProps = (state)=>{
    if(state.Reducer.brands){
        let brand = state.Reducer.brands;
        let current = state.Reducer.bcount; 
        return{brands:brand,bcount:current}
    }
    return {brands:[]}
}

export default connect(mapStateToProps)(Brand);