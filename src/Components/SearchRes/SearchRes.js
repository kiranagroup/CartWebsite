import React,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

const mapStateToProps = state => {
	return{
		searchField: state.searchProducts.searchField,
		searchResults: state.requestProductsOnSearch.searchProductResults,
	}
}

class SearchRes extends Component {

	render(){
		// const {match} = this.props;
		console.log(this.props);
		return(
			<div>
				{`Hello. This is a query for ${this.props.match.params.query} of type ${this.props.match.params.type}`}
			</div>
		)
	}
}

export default connect(mapStateToProps)(SearchRes)