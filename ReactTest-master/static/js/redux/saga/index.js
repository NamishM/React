import { getItems } from '../api';
import { call, put } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions/ItemsAction';


export function* getCartItems() {
	try {	
		const options = yield call(getItems);
		console.log(options);
		yield put(actions.itemsLoadSuccess(options));
	} catch (e) {
		yield put(actions.itemsLoadFailed(e.message));
	}
};