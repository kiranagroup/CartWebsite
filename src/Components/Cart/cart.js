import React,{Component} from 'react';
import './cart.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Store} from '../../Models/Store';
import CartProducts from './cartProducts';
import {CartTotal} from './cartTotal';
import {CartPayButton} from './cartPayButton';
import {connect} from  'react-redux';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state={props:this.props};
        this.classes='hidden';
    }
    clearCart(){
        Store.dispatch({type:'removeAll'});
    }
    closeCart(){
        Store.dispatch({type:'cartChange'});
    }
    render(){ 
        if(this.props.totalProducts>0){
            this.classes='';
        }
        else{
            this.classes='hidden';
        }
        if(this.props.visible===0  || !this.props.visible){
            return(
              <></>  
            );
        }
        return(
            <div className="cartBox" onMouseLeave={this.closeCart.bind(this)}>
            <div className="relate">
                <div className="row">
                    <h6 className="col-12 col-sm-12 centerIt">
                        Your Kirana Bill
                    </h6>
                   <div className={'col-12 col-sm-12 ' + this.classes}>
                        <p className="redIt" onClick={this.clearCart.bind(this)}>Clear All</p>
                    </div>
                    <div className="col-sm-12 col-12 nopad">
                        <CartProducts markedItems={this.props.markedItems} totalProducts={this.props.totalProducts}></CartProducts>
                    </div>
                    
                </div>
                <div className="col-sm-12 col-12 nopad row lastCart">
                        <div className="col-sm-6 col-6 cartTotal row">
                            <CartTotal items={this.props.markedItems}></CartTotal>
                        </div>
                        <div className="col-sm-6 col-6 nopad cartButton">
                            <CartPayButton count={this.props.totalProducts}></CartPayButton>
                        </div>
                    </div>
                    </div>
            </div>
        );
}
}

const mapStateToProps = (state) =>{
    if(state.Reducer.added){
        let data = state.Reducer.added;
        let count=state.Reducer.count;
        let visibl=state.Reducer.visible;
        return {markedItems:data,totalProducts:count,visible:visibl};
    }
    return {}
}

export default connect(mapStateToProps)(Cart);