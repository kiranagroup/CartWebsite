import React,{Component} from 'react';
import '../Subscriptions/subs.css';
import sample from './../../images/sample.jpg';
import sample2 from './../../images/sample2.jpg';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router'
import elasticsearch from 'elasticsearch';
import {reqCollectionQueryBody} from '../../assets/functions';
import {elasticconfig} from '../../assets/service-act.js'

class Collection extends Component{
    constructor(){
        super();
        this.state={
            reqProcessing: true,
            reqResponse: {}
        }
    }

    esClient = new elasticsearch.Client({
        host: elasticconfig.host,
        httpAuth: elasticconfig.httpAuth,
        log: 'error'
    });

    componentWillMount(){
        this.requestCollections(this.esClient);
    }

    componentDidMount(){
    }

    requestCollections = () =>{
        this.esClient.search({index: 'website', body: reqCollectionQueryBody})
        .then(results => {
            this.setState({reqResponse: results, reqProcessing: false})
        })
        .catch(err => {console.log(err);})
    }

    callMe(event){
        console.log(this.props);
        this.props.history.push('/product/'+event.target.getAttribute('myvalue'));
    }

    render(){
        if(!this.state.reqProcessing)
            console.log('Products', this.state.reqResponse);
        return(
            <div className="coll pad">
            
            <h2 className="centerIt">BUY FROM OUR COLLECTION</h2>
            <br/>
            <div className="row">

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="kitchenneeds">
                <div className="imgbox">
                <img src={sample} alt="" myvalue="kitchenneeds"/>
                </div>
                <div className="textbox">
                <h5>Kitchen Needs</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="breadsbakery">
                <div className="imgbox">
                <img src={sample2} alt="" myvalue="breadsbakery"/>
                </div>
                <div className="textbox">
                <h5>Breads & Bakery</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="snacks">
                <div className="imgbox">
                <img src={sample2} alt="" myvalue="snacks"/>
                </div>
                <div className="textbox">
                <h5>Snacks</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="beverages">
                <div className="imgbox">
                <img src={sample2} alt="" myvalue="beverages"/>
                </div>
                <div className="textbox">
                <h5>Beverages</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="personalcare">
                <div className="imgbox">
                <img src={sample2} alt="" myvalue="personalcare"/>
                </div>
                <div className="textbox">
                <h5>Personal Care</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="homecare">
                <div className="imgbox">
                <img src={sample2} alt="" myvalue="homecare"/>
                </div>
                <div className="textbox">
                <h5>Home Care</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="babycare">
                <div className="imgbox">
                <img src={sample2} alt="" myvalue="babycare"/>
                </div>
                <div className="textbox">
                <h5>Baby Care</h5>
                </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="box" onClick={this.callMe.bind(this)} myvalue="miscellaneus">
                <div className="imgbox">
                <img src={sample} alt="" myvalue="miscellaneus"/>
                </div>
                <div className="textbox">
                <h5>Miscellaneus</h5>
                </div>
                </div>
                </div>

            </div>
            {/* <hr/> */}
            </div>
        )
    }
}

export default withRouter(Collection);