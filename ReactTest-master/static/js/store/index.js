import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../redux/reducer';
import { getCartItems } from '../redux/saga';

export default () => { 
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
	  reducer,
	  applyMiddleware(sagaMiddleware)
	);
	sagaMiddleware.run(getCartItems);
	const action = type => store.dispatch({type});
    return store;
};