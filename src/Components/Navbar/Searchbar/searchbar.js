import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setSearchField, requestProducts} from '../../../Models/actions';
import elasticsearch from 'elasticsearch';
import SearchList from './searchList';
import './searchbar.css';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {elasticconfig} from '../../../assets/service-act.js'


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
		requestSearchResults: (esClient, searchBody) => requestProducts(esClient, searchBody),
	}
}

class Searchbar extends Component {

	esClient = new elasticsearch.Client({
		host: elasticconfig.host,
		httpAuth: elasticconfig.httpAuth,
		log: 'error'
	});

    searchBody = (query) => {return {
	    from: 0,
	    query: {
	    	bool:{
	    		should:{
					multi_match: {
						fields: ['Brand', 'Category', 'Description'],
						query: query,
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
			by_category: {
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

 	componentWillReceiveProps(nextProps){
		if(nextProps.searchField.length>2 &&
			nextProps.isPending===false &&
			nextProps.searchField !== this.props.searchField){
			this.props.requestSearchResults(this.esClient, this.searchBody(nextProps.searchField));		
		}
	}

	render(){
		return(
			<div id='searchBarDiv'>
	            <input 
	            	id='searchBar'
	            	type="text" 
	            	placeholder="Search"
	            	onChange={this.props.onSearchChange}
	            />
	            <SearchList />
			</div>
			);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searchbar));