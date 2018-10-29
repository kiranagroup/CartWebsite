import React,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import icon from './../../images/logo.png';
import {LoginSignup} from './LoginSignup/loginisignup';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import {Searchbar} from './Searchbar/searchbar';
import './navbar.css';
import Count from '../Cart/count';
import Cart from '../Cart/cart';

export default class Navbar extends Component{
    constructor(){
        super();
        this.state={'cart':false};
    }
    turnCartOn(){
        this.setState({...this.state,'cart':!this.state.cart},()=>{
        });
    }
    render(){
        return(
            <div className="row nav">

            {/* For Logo and ShopName */}
            <div className="col-sm-3 outside">
                <div className="col-sm-6 imgIt ibIt rightIt">
                    <img src={icon} alt=""/>
                </div>
                <div className="col-sm-6 ibIt">
                <div className="design">
                    <h3>Village HyperMarket</h3>
                    <p>Powered by Qwick </p>
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
            <div className="col-sm-12">
            <br/>
            </div>
            <div className="col-sm-12 midIt">
                <i className="fa fa-shopping-basket" aria-hidden="true" onClick={this.turnCartOn.bind(this)}>
                <Count></Count>
                </i>
                <Cart visible={this.state.cart}></Cart>
            </div>
            </div>


            </div>
        )
    }
}