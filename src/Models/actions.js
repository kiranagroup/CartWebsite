import {
	CHANGE_SEARCHFIELD,
 	REQUEST_PRODUCTS_PENDING,
 	REQUEST_PRODUCTS_SUCCESS,
 	REQUEST_PRODUCTS_FAIL} from './constants';

export const setSearchField = (text) => ({
	type: CHANGE_SEARCHFIELD,
	payload: text

})

export const requestProducts = () => (dispatch) =>{
	dispatch({ type: REQUEST_PRODUCTS_PENDING});
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(data => dispatch({type: REQUEST_PRODUCTS_SUCCESS,
								payload: data}))
		.catch(error => dispatch({type: REQUEST_PRODUCTS_FAIL,
								payload: error}))
}