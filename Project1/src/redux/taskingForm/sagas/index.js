import { takeLatestWhileAuthenticated } from '../../user/sagas';
import * as types from '../constants/ActionTypes';
import { getPTStatusDetails } from '../../tasking/sagas';

export function* watchForTaskingFormVisible() {
  yield* takeLatestWhileAuthenticated([
    types.TASKINGFORM_TOGGLE_VISIBLITY,
  ], getPTStatusDetails);
}
