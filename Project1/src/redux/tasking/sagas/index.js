import { takeLatestWhileAuthenticated } from '../../user/sagas';
import {
  put,
  call,
  select,
  take,
  fork,
  cancel,
} from 'redux-saga/effects';
import {
  delay,
} from 'redux-saga';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../chartBinFilter/constants/ActionTypes';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions/taskingActions';
import {
  getTaskingDetails,
  updateTaskingStatus,
  getUpdatedSequence,
  saveTask,
  getTaskingDetailsByEncounterId,
  getFavoriteTask,
  deleteFavoriteTask,
  createFavoriteTask,
} from '../api';
import { getFilterCriteria } from '../../chartBinFilter/reducers/chartBinFilter';
import {
  getNextTaskToUpdate,
  AnyActiveTask,
} from '../reducers/taskingDetails';
import { getUserProfileSettings, getUserId } from '../../user/reducers/login';
import { taskStatus } from '../helpers/helper';
import { reduceObjectsToString } from '../../../utilities';
// import { bindnoTaskgridList } from '../../noTaskGrid/sagas';

export function* getPTStatusDetails() {
  try {
    const {
      selectedProviders,
      taskGroups,
      selectedRooms,
      selectedPersonId,
    } = yield select(getFilterCriteria);

    const multipleProviderId = reduceObjectsToString(selectedProviders, 'value');

    let roomIdQueryString = 'RoomId';
    const multipleRoomId = reduceObjectsToString(selectedRooms, (obj) => {
      if (obj.value === -1) {
        roomIdQueryString = 'RoomId-RoomId:missing';
        return '$true';
      }
      return `${obj.value}`;
    });

    const taskGroupsId = reduceObjectsToString(taskGroups, 'value');

    const taskingDetails = yield call(
      getTaskingDetails,
      multipleProviderId,
      multipleRoomId,
      roomIdQueryString,
      taskGroupsId,
      selectedPersonId,
    );
    if (taskingDetails.entities.patientTrackingStatuses) {
      yield put(actions.getPTStatusDetailsSucceeded(
        taskingDetails.result,
        taskingDetails.entities,
        taskingDetails.stats,
      ));
    }
  } catch (e) {
    yield put(actions.getPTStatusDetailsFailed(e.message));
  }
}

export function* getPTSDetailsForEncounterId({ encounterId }) {
  try {
    const taskingDetails = yield call(
      getTaskingDetailsByEncounterId,
      encounterId,
      `${taskStatus.Cancelled.id},${taskStatus.Completed.id}`,
    );
    yield put(actions.fetchingTasksForEncounterCompleted({
      result: taskingDetails.result || [],
      entities: taskingDetails.entities || { patientTrackingStatuses: {} },
      stats: taskingDetails.stats,
    }));
  } catch (e) {
    yield put(actions.fetchingTasksForEncounterFailed(e.message));
  }
}

export function* taskingStatusUpdate(request) {
  try {
    const taskingDetails = yield call(updateTaskingStatus, request.task);
    yield put(actions.taskingStatusUpdateSucceded(taskingDetails));
    if (
      request.type === types.TASK_STATUS_UNHOLD ||
      request.type === types.TASK_STATUS_CANCEL ||
      request.type === types.TASK_STATUS_COMPLETE
    ) {
      const isAnyActiveTask = yield select(
        AnyActiveTask,
        request.task.encounterId,
      );
      if (!isAnyActiveTask) {
        const nextTaskToUpdate = yield select(
          getNextTaskToUpdate,
          request.task.encounterId,
        );
        if (nextTaskToUpdate) {
          const taskToUpdate = {
            ...nextTaskToUpdate,
            taskStatusId: taskStatus.Waiting.id,
          };
          const nextUpdatedTask = yield call(updateTaskingStatus, taskToUpdate);
          yield put(actions.taskingStatusUpdateSucceded(nextUpdatedTask));
        }
      }
    }
  } catch (e) {
    yield put(actions.taskingStatusUpdateFailed(e.message));
  }
}

export function* taskingChangeSequence(request) {
  try {
    const taskingDetails = yield call(updateTaskingStatus, request.task);
    yield put(actions.taskingStatusUpdateSucceded(taskingDetails));
    const updatedSequence = yield call(
      getUpdatedSequence,
      request.encounterId,
      request.actualSequence,
    );
    yield put(actions.taskSequenceChangeSucceded(
      updatedSequence,
    ));
  } catch (e) {
    yield put(actions.taskSequenceChangeFailed(e.message));
  }
}

export function* saveTaskSaga(request) {
  try {
    const taskingDetails = yield call(saveTask, request.task);
    yield put(actions.taskSaveSuccess(taskingDetails));
  } catch (e) {
    yield put(actions.taskSaveFailed(e.message));
  }
}

export function* watchForAppointmentFilterandReset() {
  yield* takeLatestWhileAuthenticated([
    CHARTBINFILTER_APPOINTMENT_FILTER,
    CHARTBINFILTER_RESET_GRID,
  ], getPTStatusDetails);
}

export function* watchForTaskSave() {
  yield* takeLatestWhileAuthenticated([
    types.TASK_SAVE_REQUESTED,
  ], saveTaskSaga);
}

export function* watchForTaskingActions() {
  yield [
    takeLatestWhileAuthenticated([
      types.TASK_STATUS_UNHOLD,
      types.TASK_STATUS_HOLD,
      types.TASK_STATUS_COMPLETE,
      types.TASK_STATUS_CANCEL,
      types.TASK_STATUS_START,
    ], taskingStatusUpdate),
    // takeLatestWhileAuthenticated(
    //   types.TASK_FETCH_TASKS_FOR_ENCOUNTER,
    //   getPTSDetailsForEncounterId,
    // ),
  ];
}

export function* watchForTaskChangeSequence() {
  yield* takeLatestWhileAuthenticated(
    types.TASK_CHANGE_SEQUENCE,
    taskingChangeSequence,
  );
}

export function* _pollForTasks(intervalSeconds) {
  if (intervalSeconds > 0) {
    // eslint-disable-next-line no-constant-condition
    while (true) { // until we are canceled...
      let counter = intervalSeconds;
      while (counter > 0) {
        yield put(actions.tickRefreshCounter(counter));
        counter -= 1;
        yield call(delay, 1000);
      }
      yield call(getPTStatusDetails);
      // yield call(bindnoTaskgridList, { page: 1 });
    }
  }
}

export function* watchForPollingStartAndEnd() {
  yield* takeLatestWhileAuthenticated(
    types.TASK_START_POLLING,
    function* waitFor() {
      const { taskingRefreshInterval } = yield select(getUserProfileSettings);
      // start syncing tasks via API
      const task = yield fork(_pollForTasks, taskingRefreshInterval);
      // wait for the user to cancel poling
      yield take(types.TASK_STOP_POLLING);
      yield cancel(task);
    },
  );
}

export function* watchForTaskingRefresh() {
  yield* takeLatestWhileAuthenticated(
    types.REFRESH_TASKING_DATA,
    function* resetPolling() {
      yield put(actions.stopPollingForTasks());
      yield call(getPTStatusDetails);
      yield call(delay, 500);
      yield put(actions.startPollingForTasks());
    },
  );
}

export function* getFavoriteTaskList(request) {
  try {
    let selectedStatuses = '';
    if (request.favoriteFilters.patientStatusTypeIds.length !== 0) {
      selectedStatuses = request.favoriteFilters.patientStatusTypeIds.join(',');
    }
    const { userId } = yield select(getUserId);
    const options = yield call(getFavoriteTask, selectedStatuses, userId);
    yield put(actions.taskFavoriteSuccess(options));
  } catch (e) {
    yield put(actions.taskFavoriteFailed(e.message));
  }
}

export function* watchForGetFavoriteTask() {
  yield* takeLatestWhileAuthenticated([
    types.GET_FAVORITE_LIST,
  ], getFavoriteTaskList);
}

export function* deleteFavoriteTaskTemplate(request) {
  try {
    yield call(deleteFavoriteTask, request.templateMappingId);
    yield put(actions.getFavoriteOptions({
      taskDesc: '',
      patientStatusTypeIds: [],
    }));
  } catch (e) {
    yield put(actions.taskFavoriteFailed(e.message));
  }
}

export function* watchForFavoriteTaskDelete() {
  yield* takeLatestWhileAuthenticated([
    types.TASK_FAVORITE_TEMPLATE_DELETE,
  ], deleteFavoriteTaskTemplate);
}

export function* createFavoriteTaskTemplate(request) {
  try {
    const { userId } = yield select(getUserId);
    yield call(createFavoriteTask, parseInt(request.groupId, 10),
      request.templateDetails, parseInt(userId, 10));
    yield put(actions.getFavoriteOptions({
      taskDesc: '',
      patientStatusTypeIds: [],
    }));
  } catch (e) {
    yield put(actions.taskFavoriteFailed(e.message));
  }
}

export function* watchForFavoriteTaskCreate() {
  yield* takeLatestWhileAuthenticated([
    types.TASK_FAVORITE_TEMPLATE_CREATE,
  ], createFavoriteTaskTemplate);
}
