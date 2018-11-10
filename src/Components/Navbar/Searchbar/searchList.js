import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './searchList.css';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
	return{
		searchField: state.searchProducts.searchField,
		searchResults: state.requestProductsOnSearch.searchProductResults,
	}
}

class SearchList extends Component {
	
	render(){
		const {searchField, searchResults}= this.props;
		if(searchField.length>2 && Object.keys(searchResults).length){
			const brands = searchResults.aggregations.by_brand.buckets;
			const categs = searchResults.aggregations.by_category.buckets;
			// if(brands.length && categs.length)
				return(
					<div id='searchlist'>
						<Link to={`/search/q${searchField}/raw`}>Search for '{searchField}'</Link>
						{(brands.length>1 && categs.length>1)?
							<div>
							    <Link to={`/search/q${searchField}/b0`}>'{searchField}' in {brands[0].key}</Link>
								<Link to={`/search/q${searchField}/b1`}>'{searchField}' in {brands[1].key}</Link>
								<Link to={`/search/q${searchField}/c0`}>'{searchField}' in {categs[0].key}</Link>
								<Link to={`/search/q${searchField}/c1`}>'{searchField}' in {categs[1].key}</Link>
							</div>
							:<div />
						}
					</div>
				)
			// else return (
			// 		<div id='searchlist'>
			// 			No results found
			// 		</div>
			// 	)
		}
		return <div />
	}
}

export default connect(mapStateToProps)(SearchList);