import { put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import * as types from '../constants/ActionTypes';
import { removeItem} from '../actions/ItemsAction';
import { getItemsList } from '../reducer';

function* checkDecrementValue(request) {
	console.log(request);
	const results = yield select(getItemsList);
	const item = (results.filter(rs => rs.id == request.id)|| [])[0];
	if(item && item.quantityAdded == 0){
		yield put(removeItem(item.id));
	}
}

export function* watchCartDecrement() {
	yield* takeLatest(types.ITEM_DECREASED, checkDecrementValue);
};