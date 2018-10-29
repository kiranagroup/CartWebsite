import React from 'react';
import sample from './../../images/sample.jpg';
import sample2 from './../../images/sample2.jpg';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './subs.css';

export const Subs = () =>{
    return(
        <div className="subs pad">
        
        <h2 className="centerIt">SUBSCRIBE FOR DAILY DELIVERY</h2>
        <br/>
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="box">
            <div className="imgbox">
            <img src={sample} alt=""/>
            </div>
            <div className="textbox">
            <h5>Milk</h5>
            </div>
            </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="box">
            <div className="imgbox">
            <img src={sample} alt=""/>
            </div>
            <div className="textbox">
            <h5>Eggs</h5>
            </div>
            </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="box">
            <div className="imgbox">
            <img src={sample2} alt=""/>
            </div>
            <div className="textbox">
            <h5>Fruits & Veggies</h5>
            </div>
            </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="box">
            <div className="imgbox">
            <img src={sample2} alt=""/>
            </div>
            <div className="textbox">
            <h5>Breads</h5>
            </div>
            </div>
            </div>
        </div>
        {/* <hr/> */}
        </div>
    )
}