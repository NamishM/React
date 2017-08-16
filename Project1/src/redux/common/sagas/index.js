import { takeLatestWhileAuthenticated } from '../../user/sagas';
import {
  put,
  call,
  select,
} from 'redux-saga/effects';
import { NO_TASKGRID_ROOM_UPDATE_REQUESTED } from '../../noTaskGrid/constants/ActionTypes';
import {
  noTaskRoomUpdateSucceeded,
  noTaskRoomUpdateFailed,
} from '../../noTaskGrid/actions';
import {
  getRoomTransactiontoUpdate,
  updateRoom,
} from '../api';
import { getFilters } from '../../../redux/chartBinFilter/reducers/chartBinFilter';


export function* taskingUpdateRoom(request) {
  try {
    let transactionDetails = yield call(getRoomTransactiontoUpdate, request);
    transactionDetails = transactionDetails.find(transDetail => transDetail.finishUserId === null);
    if (transactionDetails) {
      yield call(updateRoom, transactionDetails.id, request);
      const { rooms } = yield select(getFilters);
      const room = rooms.find(r => r.value.toString() === request.newRoomId.toString());
      const roomDesc = room ? room.label : '';
      yield put(noTaskRoomUpdateSucceeded(
        request.encounterId,
        request.taskId,
        request.existingRoomId,
        request.newRoomId,
        roomDesc,
      ));
    }
    // TODO: What should happen here? Limbo...
  } catch (e) {
    yield put(noTaskRoomUpdateFailed(e.message));
  }
}

export function* watchRoomUpdateRequested() {
  yield* takeLatestWhileAuthenticated([
    NO_TASKGRID_ROOM_UPDATE_REQUESTED],
  taskingUpdateRoom);
}
