import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../redux/reducer';
import { getCartItems } from '../redux/saga';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => { 
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		reducer,
		composeWithDevTools(
			applyMiddleware(sagaMiddleware)
		)
	);
	sagaMiddleware.run(getCartItems);
	const action = type => store.dispatch({type});
    return store;
};