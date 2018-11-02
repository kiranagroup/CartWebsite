import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {
	Reducer, 
	searchProducts, 
	requestProductsOnSearch,
	} from './Reducer';

const rootReducer = combineReducers({Reducer, searchProducts, requestProductsOnSearch})
export const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()));