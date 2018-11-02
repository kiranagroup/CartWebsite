import React, {Component} from 'react';
import {connect} from 'react-redux'
import {setSearchField, requestProducts} from '../../../Models/actions'
import elasticsearch from 'elasticsearch';
import {searchElastic} from '../../../assets/functions'

const mapStateToProps = state => {
	return{
		searchField: state.searchProducts.searchField,
		searchProductResults: state.requestProductsOnSearch.searchProductResults,
		isPending: state.requestProductsOnSearch.isPending,
		error: state.requestProductsOnSearch.error
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		requestSearchResults: (esClient, searchBody) => {
			console.log(searchBody);
			requestProducts(esClient, searchBody);
		}
	}
}

class Searchbar extends Component {

	esClient = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'error'
	});

    searchBody = () => {return {
	    from: 0,
	    query: {
	    	bool:{
	    		should:{
					multi_match: {
						fields: ['Brand', 'Category', 'Description'],
						query: this.props.searchField,
						fuzziness: '2',
					}
				}
			}
	    },
		aggs: {
			by_brand: {
				terms: {
					field: 'Brand.keyword',
					size: 10,
					order: { max_score: 'desc' }
				},
				aggs: {
					by_top_hit: { top_hits: {size: 15} },

					max_score: {max: { script: "_score" } }
				}
			},
			by_Category: {
				terms: {
					field: 'Category.keyword',
					size: 10,
					order: { max_score: 'desc' }
				},
				aggs: {
					by_top_hit: { top_hits: {size: 15} },

					max_score: {max: { script: "_score" } }
				}
			}
		}
  	}};

	onSearchChangeCall = (event) => {
		this.props.onSearchChange(event);
		if(this.props.searchField.length>1)
			this.props.requestSearchResults(this.esClient, this.searchBody());
	}

	render(){		
		return(
			<div>
	            <input id='searchBar' 
	            	type="text" 
	            	placeholder="Search"
	            	onChange={this.onSearchChangeCall}
	            />
			</div>
			);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);