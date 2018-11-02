import {
	CHANGE_SEARCHFIELD,
 	REQUEST_PRODUCTS_PENDING,
 	REQUEST_PRODUCTS_SUCCESS,
 	REQUEST_PRODUCTS_FAIL} from './constants';
import {searchElastic} from '../assets/functions';
import {Store} from './Store';

export const setSearchField = (text) => ({
	type: CHANGE_SEARCHFIELD,
	payload: text

})

export const requestProducts = (esClient, searchBody) =>{
	console.log('Body', searchBody);
	Store.dispatch({type: REQUEST_PRODUCTS_PENDING});
	esClient.search({index: 'learn4', body: searchBody})
	.then(data => {
		if(data){
			Store.dispatch({
				type: REQUEST_PRODUCTS_SUCCESS,
				payload: data
			})
		}
	})
	.catch(error => {
		Store.dispatch({
			type: REQUEST_PRODUCTS_FAIL,
			payload: error})
	})
}