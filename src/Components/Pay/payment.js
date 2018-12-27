import React,{Component} from 'react';
import { Store } from '../../Models/Store';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './pay.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class Payment extends Component{
    constructor(){
        super();
        this.totalAmount=0;
    }
    componentDidMount(){
        if(this.props.products){
            for(let i=0;i<this.props.products.length;i++){
                this.totalAmount+=this.props.products[i].value*this.props.products[i].Product.Price.split('₹')[1];
            }
        }
    }
    render(){
        if(!this.props.total){
            return(
                <div className='container centerIt'>
                    <h3>Your Cart is empty</h3>
                    <button className='nocartbtn' onClick={()=>{
                        this.props.history.push('/');
                    }}> <b>Please Shop <i className="fa fa-caret-right" aria-hidden="true"></i></b> </button>
                </div>
            )
        }
        while(!this.props.products){
            return(
                <div className="container centerIt">
                    <img src={require('../../images/loader.gif')} className="load" alt="Loading..."/>
                </div>
            )
        }
        return(
            <div className='container payment'>
                <div className="row">
                    <div className="col-12 col-sm-12 headtab row">
                        <div className="col-4 col-sm-4 heading">
                            <h5>Item Description</h5>    
                        </div>
                        <div className="col-2 col-sm-2 heading">
                            <h5>Unit Price</h5>
                        </div>
                        <div className="col-4 col-sm-4 heading">
                            <h5>Quantity</h5>
                        </div>
                        <div className="col-2 col-sm-2 heading">
                            <h5>Subtotal</h5>
                        </div>
                    </div>
                    {this.props.products.map((element,index)=>{
                        return(
                            <div className="col-12 col-sm-12 itemrow row" key={index}>
                            <div className="col-4 col-sm-4 itemtab">
                                <h6>{element.Product.Brand}</h6>
                                <h6>{element.Product.Description}</h6>    
                            </div>
                            <div className="col-2 col-sm-2 itemtab linemid">
                                <h6>{element.Product.Price}</h6>
                            </div>
                            <div className="col-4 col-sm-4 itemtab linemid">
                                <button className="dec" onClick={()=>{
                                    Store.dispatch({'type':'sub','payLoad':element});
                                }}>-</button>
                                <h6 className='quantity'>{element.value}</h6>
                                <button className="inc" onClick={()=>{
                                    Store.dispatch({'type':'add','payLoad':element});
                                }}>+</button>
                            </div>
                            <div className="col-2 col-sm-2 itemtab linemid">
                                <h6>₹{element.value * element.Product.Price.split('₹')[1]}</h6>
                            </div>
                            </div>
                        )
                    })}
                    <div className="col-12 col-sm-12 row lastrow">
                        <div className="col-4 col-sm-4 lasttab">
                            <button className='lastbtn' onClick={()=>{
                                this.props.history.push('/');
                            }}> <b>Continue Shopping</b> </button>
                        </div>
                        <div className="col-3 col-sm-3 lasttab">
                                <button className='lastbtn short' onClick={()=>{
                                    Store.dispatch({'type':'removeAll'});
                                }}> <b>Clear All</b> </button>   
                                <button className='lastbtn2'> <b>Checkout <i className="fa fa-caret-right" aria-hidden="true"></i></b> </button>
                        </div>
                        <div className="col-5 col-sm-5 lasttab row">
                            <div className="col-8 col-sm-8">
                                Subtotal
                            </div>
                            <div className="col-4 col-sm-4">
                                <b>₹{this.totalAmount}</b>
                            </div>
                            <div className="col-8 col-sm-8">
                                Delivery Charges
                            </div>
                            <div className="col-4 col-sm-4">
                                <b>₹ x</b>
                            </div>
                            <hr/>
                            <div className="col-8 col-sm-8">
                                <b>Total</b>
                            </div>
                            <div className="col-4 col-sm-4">
                                <b>₹ y</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    if(state.Reducer.added){
        var product = state.Reducer.added;
        var count = state.Reducer.count;
        return {products:product,total:count}
    }
    return {}
}

export default connect(mapStateToProps)(Payment);