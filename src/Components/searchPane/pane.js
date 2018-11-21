import React,{Component} from 'react';
import Category from './Panes/category';
import Brand from './Panes/brand';
import Price from './Panes/price';
import elasticsearch from 'elasticsearch';
import {searchPaneQueryBody} from '../../assets/functions';
import {elasticconfig} from '../../assets/service-act.js'

class Pane extends Component{
    constructor(props){
        super(props);
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

    requestFilteredData(brands, categories, lowBound, highBound){
    	this.setState({reqProcessing: true});
        this.esClient.search({index: 'website', body: searchPaneQueryBody(brands, categories, lowBound, highBound)})
        .then(results => {
            this.setState({reqResponse: results, reqProcessing: false})
        })
        .catch(err => {console.log(err);})
    }
    componentDidMount(){
    	this.requestFilteredData(['nivea', 'patanjali'], ["Snacks and namkeen","Hair care"]);
    }

    render(){
    	if(!this.state.reqProcessing){console.log(this.state.reqResponse)}
	    return(
	        <div style={{textAlign:'center',border:'1px solid rgba(0,0,0,0.75)',borderRadius:'5px',padding:'2.5% 5%'}}>
	            <Category category={this.props.category}></Category>
	            <Brand category={this.props.category}></Brand>
	            <Price category={this.props.category}></Price>
	        </div>
	    );
	}
}
export default Pane;