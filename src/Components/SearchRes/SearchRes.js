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

	componentWillMount(){
		this.filteredProducts=[];
		switch(this.props.match.params.type){
			case 'b0': console.log('This is b0');
				break;
			case 'b1': console.log('This is b1');
				break;
			case 'c0': console.log('This is c0');
				break;
			case 'c1':
				console.log('This is c1');
				break;
			default: console.log('This is raw');
		}
	}

	render(){
		const {match, searchResults} = this.props;
		console.log(this.props);
		return(
			<div>
            <div className="row">
	            <div id='searchPane' className="col-lg-2 col-md-3">
	                <h3 align='center'>Search Pane</h3>
	            </div>
	            <div className="col-lg-10 col-md-9">
{	              //  <Product items={this.products} counter={this.state.count}></Product>
// 	            	                {show}}
}
				{`Hello. This is a query for ${this.props.match.params.query} of type ${this.props.match.params.type}`}
	            </div>

            </div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(SearchRes)