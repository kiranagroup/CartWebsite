import React,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import icon from './../../images/logo.png';
import {LoginSignup} from './LoginSignup/loginisignup';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import Searchbar from './Searchbar/searchbar';
import './navbar.css';
import Count from '../Cart/count';
import Cart from '../Cart/cart';
import {connect} from 'react-redux';
import {Store} from '../../Models/Store';

class Navbar extends Component{
    constructor(){
        super();
        // this.state={'cart':this.props.visible};
    }
    turnCartOn(){
        // this.setState({...this.state,'cart':!this.state.cart},()=>{
        // });
        Store.dispatch({type:'cartChange'});
    }
    render(){
        return(
            <div className="row nav">

            {/* For Logo and ShopName */}
            <div className="col-sm-3 row outside">
                <div className="col-sm-6 imgIt ibIt rightIt">
                    <img src={icon} alt=""/>
                </div>
                <div className="col-sm-6 ibIt">
                <div className="design">
                    <h4>Village HyperMarket</h4>
                    </div>
                </div>
            </div>

            {/* For SearchBar */}
            <div className="col-sm-7 outside">
                <div className="col-sm-12 rightIt">
                    <h6>Sample Text</h6>
                </div>
                <div className="col-sm-12 searchIt">
                    <Searchbar></Searchbar>
                </div>
            </div>
            
            {/* For Showing Cart and Login/Signup */}
            <div className="col-sm-2 outside">
            <div className="col-sm-12 lsIt">
            <LoginSignup></LoginSignup>
            </div>
            <div className="col-sm-12 h12">
            </div>
            <div className="col-sm-12 midIt">
                <i className="fa fa-shopping-basket" aria-hidden="true" onClick={this.turnCartOn.bind(this)}>
                <Count></Count>
                </i>
                {/* <Cart visible={this.state.cart}></Cart> */}
                <Cart></Cart>
            </div>
            </div>


            </div>
        )
    }
}

// const mapStateToProps = (state) =>{
//     if(state.visible){
//         let cart=state.visible;
//         return {visible:cart};
//     }
//     return {}
// }

export default Navbar;