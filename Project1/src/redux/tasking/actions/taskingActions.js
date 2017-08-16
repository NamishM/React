import * as types from '../constants/ActionTypes';

export const startPollingForTasks = () => ({
  type: types.TASK_START_POLLING,
});

export const stopPollingForTasks = () => ({
  type: types.TASK_STOP_POLLING,
});

export const tickRefreshCounter = counter => ({
  type: types.TASK_REFRESH_COUNTER_TICK,
  counter,
});

export const onTaskingRefreshClick = () => ({
  type: types.REFRESH_TASKING_DATA,
});

export const getPTStatusDetailsSucceeded = (result, entities, stats) => ({
  type: types.TASKINGDETAILS_LOAD_SUCCEDED,
  result,
  entities,
  stats,
});

export const getPTStatusDetailsFailed = errorMessage => ({
  type: types.TASKINGDETAILS_LOAD_FAILED,
  errorMessage,
});

export const taskStart = task => ({
  type: types.TASK_STATUS_START,
  task,
});

export const taskUnHold = task => ({
  type: types.TASK_STATUS_UNHOLD,
  task,
});

export const taskHold = task => ({
  type: types.TASK_STATUS_HOLD,
  task,
});

export const taskComplete = task => ({
  type: types.TASK_STATUS_COMPLETE,
  task,
});

export const taskCancel = task => ({
  type: types.TASK_STATUS_CANCEL,
  task,
});

export const taskChangeSequence = (task, actualSequence, encounterId) => ({
  type: types.TASK_CHANGE_SEQUENCE,
  task,
  actualSequence,
  encounterId,
});

export const taskingStatusUpdateSucceded = updatedresult => ({
  type: types.TASK_STATUSUPDATE_SUCCEDED,
  updatedresult,
});

export const taskingStatusUpdateFailed = errorMessage => ({
  type: types.TASK_STATUSUPDATE_FAILED,
  errorMessage,
});

export const taskSequenceChangeSucceded = updatedSequence => ({
  type: types.TASK_CHANGE_SEQUENCE_SUCCEDED,
  updatedSequence,
});

export const taskSequenceChangeFailed = errorMessage => ({
  type: types.TASK_CHANGE_SEQUENCE_FAILED,
  errorMessage,
});

export const taskingGetRoomsList = (encounterId, id, isRoomsClicked) => ({
  type: types.TASK_GET_ROOM_LIST,
  encounterId,
  id,
  isRoomsClicked,
});

export const fetchingTasksForEncounter = encounterId => ({
  type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER,
  encounterId,
});

export const fetchingTasksForEncounterCompleted = ({ result, entities, stats }) => ({
  type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER_COMPLETED,
  result,
  entities,
  stats,
});

export const fetchingTasksForEncounterFailed = errorMessage => ({
  type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER_FAILED,
  errorMessage,
});

export const taskSaveRequested = ({
  patientStatusTypeId,
  taskDetails,
  encounterId,
}) => ({
  type: types.TASK_SAVE_REQUESTED,
  task: {
    patientStatusTypeId,
    taskDetails,
    encounterId,
  },
});

export const taskSaveFailed = message => ({
  type: types.TASK_SAVE_FAILED,
  message,
});

export const taskSaveSuccess = task => ({
  type: types.TASK_SAVE_SUCCESS,
  task,
});

export const getFavoriteOptions = ({
  taskDesc,
  patientStatusTypeIds,
}) => ({
  type: types.GET_FAVORITE_LIST,
  favoriteFilters: {
    taskDesc,
    patientStatusTypeIds,
  },
});

export const taskFavoriteSuccess = options => ({
  type: types.TASK_FAVORITE_SUCCESS,
  options,
});

export const taskFavoriteFailed = message => ({
  type: types.TASK_FAVORITE_FAILED,
  message,
});

export const onTaskAlertClick = (task, selectedIcon) => ({
  type: types.TASK_ALERT_CLICK,
  task,
  selectedIcon,
});

export const taskFavoriteDelete = templateMappingId => ({
  type: types.TASK_FAVORITE_TEMPLATE_DELETE,
  templateMappingId,
});

export const taskFavoriteCreate = (groupId, templateDetails) => ({
  type: types.TASK_FAVORITE_TEMPLATE_CREATE,
  groupId,
  templateDetails,
});
