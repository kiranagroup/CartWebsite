import React,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import SearchProduct from './searchProduct';
import Pane from '../searchPane/pane';

const mapStateToProps = state => {
	return{
		searchField: state.searchProducts.searchField,
		searchResults: state.requestProductsOnSearch.searchProductResults,
	}
}

class SearchRes extends Component {

    constructor(props){
        super(props);
        this.props=props;
        this.gotData=false;
        this.searchType='';
        this.gotError=false;
        this.error="";
        this.products=[];
        // this.count=50;
        this.state={
        	'count':50,
        	products: []
    	}
    }

    updateProducts = () =>{
		switch(this.props.match.params.type){
			case 'b0': this.setState({products: this.props.searchResults.aggregations.by_brand.buckets[0].by_top_hit.hits.hits});
				break;
			case 'b1': this.setState({products: this.props.searchResults.aggregations.by_brand.buckets[1].by_top_hit.hits.hits});
				break;
			case 'c0': this.setState({products: this.props.searchResults.aggregations.by_category.buckets[0].by_top_hit.hits.hits});
				break;
			case 'c1': this.setState({products: this.props.searchResults.aggregations.by_category.buckets[1].by_top_hit.hits.hits});
				break;
			default: this.setState({products: this.props.searchResults.hits.hits});
		}
    }

	componentDidMount(){
		this.updateProducts();
        if(this.state.products){
            this.gotData=true;
            this.gotError=false;
            this.error='';
        }
        else{
            this.gotError=true;
            this.error="We are extremely sorry, but please try again later."
        }
        this.setState({});
	}

	componentWillReceiveProps(newProps){
		if(newProps.match.params.type !== this.props.match.params.type
			|| newProps.match.params.query !== this.props.match.params.query){
	    	this.updateProducts();
		}
	}

    render(){

		const {match, searchResults} = this.props;
		// return <div />
        while(!this.gotData && !this.gotError){
            return(
                <div className="container centerIt">
                    <img src={require('../../images/loader.gif')} className="load" alt="Loading..."/>
                </div>
            )
        }
        while(!this.gotData && this.gotError){
            return(
                <div className="container centerIt">
                    <h4 className="alert">{this.error}</h4>
                </div>
            )
        }
        if(this.state.count<this.products.length){
            var show= <div className="centerIt">       
            <button className="btn" onClick={()=>{this.setState({'count':this.state.count+50});
        }}> <b> Show More </b> </button>
        </div>
        }
        else{
            var show = <h4 className="centerIt mbott">That's all, Thank You.</h4>;
        }
        return(
            <div className="row">
            <div className="col-lg-2 col-md-2" style={{padding:'0 0 0 2px'}}>
            <Pane category={this.category}></Pane>
            </div>
            <div className="col-lg-10 col-md-10">
                <SearchProduct items={this.state.products} counter={this.state.count}></SearchProduct>
                {show}
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SearchRes)