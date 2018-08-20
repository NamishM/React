import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../redux/reducer';
import { watchCartDecrement } from '../redux/saga';
import { loadState, saveState } from '../localStorage/localStorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash.throttle';
export default () => { 
	const sagaMiddleware = createSagaMiddleware();
	const persistedState = loadState();
	const store = createStore(
		reducer,
		persistedState,
		composeWithDevTools(
			applyMiddleware(sagaMiddleware)
		)
	);
	store.subscribe(throttle(() => {
		saveState(store.getState());
	  }, 1000));
	sagaMiddleware.run(watchCartDecrement);
	const action = type => store.dispatch({type});
    return store;
};