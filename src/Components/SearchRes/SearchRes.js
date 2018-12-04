import React,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import SearchProduct from './searchProduct';
import Pane from '../searchPane/pane';
import {requestProducts} from '../../Models/actions';
import elasticsearch from 'elasticsearch';
import {elasticconfig} from '../../assets/service-act.js'

const mapStateToProps = state => {
	return{
		searchField: state.searchProducts.searchField,
		searchResults: state.requestProductsOnSearch.searchProductResults,
		isPending: state.requestProductsOnSearch.isPending,
		error: state.requestProductsOnSearch.error	
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		requestSearchResults: (esClient, searchBody) => requestProducts(esClient, searchBody),
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

	// esClient = new elasticsearch.Client({
	// 	host: elasticconfig.host,
	// 	httpAuth: elasticconfig.httpAuth,
	// 	log: 'error'
	// });

 //    searchBody = () => {return {
	//     from: 0,
	//     query: {
	//     	bool:{
	//     		should:{
	// 				multi_match: {
	// 					fields: ['Brand', 'Category', 'Description'],
	// 					query: this.props.match.params.query,
	// 					fuzziness: '2',
	// 				}
	// 			}
	// 		}
	//     },
	// 	aggs: {
	// 		by_brand: {
	// 			terms: {
	// 				field: 'Brand.keyword',
	// 				size: 10,
	// 				order: { max_score: 'desc' }
	// 			},
	// 			aggs: {
	// 				by_top_hit: { top_hits: {size: 15} },

	// 				max_score: {max: { script: "_score" } }
	// 			}
	// 		},
	// 		by_category: {
	// 			terms: {
	// 				field: 'Category.keyword',
	// 				size: 10,
	// 				order: { max_score: 'desc' }
	// 			},
	// 			aggs: {
	// 				by_top_hit: { top_hits: {size: 15} },

	// 				max_score: {max: { script: "_score" } }
	// 			}
	// 		}
	// 	}
 //  	}};

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
    	if(Object.keys(this.props.searchResults).length === 0){
			// this.props.requestSearchResults(this.esClient, this.searchBody());	
			this.props.history.push('/');
    	} else
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
	}

	componentDidUpdate(oldProps){
		if(oldProps.match.params.type !== this.props.match.params.type
			|| oldProps.match.params.query !== this.props.match.params.query
			|| oldProps.searchResults!==this.props.searchResults){
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchRes)