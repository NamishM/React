
import * as types from '../../constants/ActionTypes';
import * as taskingActions from '../../actions/taskingActions';
import * as roomSliderActions from '../../actions/roomSliderAction';
import * as nestedTaskActions from '../../actions/nestedTaskExpandAction';
import * as filterActions from '../../actions/filterAction';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('tasking action', () => {
  it('startPollingForTasks should create TASK_START_POLLING action', () => {
    expect(taskingActions.startPollingForTasks()).toEqual({
      type: types.TASK_START_POLLING,
    });
  });

  it('stopPollingForTasks should create TASK_STOP_POLLING action', () => {
    expect(taskingActions.stopPollingForTasks()).toEqual({
      type: types.TASK_STOP_POLLING,
    });
  });

  it('tickRefreshCounter should create TASK_REFRESH_COUNTER_TICK action', () => {
    expect(taskingActions.tickRefreshCounter(1)).toEqual({
      type: types.TASK_REFRESH_COUNTER_TICK,
      counter: 1,
    });
  });

  it('onTaskingRefreshClick should create REFRESH_TASKING_DATA action', () => {
    expect(taskingActions.onTaskingRefreshClick()).toEqual({
      type: types.REFRESH_TASKING_DATA,
    });
  });

  it('getPTStatusDetailsSucceeded should create TASKINGDETAILS_LOAD_SUCCEDED action', () => {
    expect(taskingActions.getPTStatusDetailsSucceeded([], {}, {})).toEqual({
      type: types.TASKINGDETAILS_LOAD_SUCCEDED,
      result: [],
      entities: {},
      stats: {},
    });
  });

  it('getPTStatusDetailsFailed should create TASKINGDETAILS_LOAD_FAILED action', () => {
    expect(taskingActions.getPTStatusDetailsFailed('Error in API response')).toEqual({
      type: types.TASKINGDETAILS_LOAD_FAILED,
      errorMessage: 'Error in API response',
    });
  });

  it('taskStart should create TASK_STATUS_START action', () => {
    expect(taskingActions.taskStart({})).toEqual({
      type: types.TASK_STATUS_START,
      task: {},
    });
  });

  it('taskUnHold should create TASK_STATUS_UNHOLD action', () => {
    expect(taskingActions.taskUnHold({})).toEqual({
      type: types.TASK_STATUS_UNHOLD,
      task: {},
    });
  });

  it('taskHold should create TASK_STATUS_HOLD action', () => {
    expect(taskingActions.taskHold({})).toEqual({
      type: types.TASK_STATUS_HOLD,
      task: {},
    });
  });

  it('taskComplete should create TASK_STATUS_COMPLETE action', () => {
    expect(taskingActions.taskComplete({})).toEqual({
      type: types.TASK_STATUS_COMPLETE,
      task: {},
    });
  });

  it('taskCancel should create TASK_STATUS_CANCEL action', () => {
    expect(taskingActions.taskCancel({})).toEqual({
      type: types.TASK_STATUS_CANCEL,
      task: {},
    });
  });

  it('taskChangeSequence should create TASK_CHANGE_SEQUENCE action', () => {
    expect(taskingActions.taskChangeSequence({}, 1, 'GUID')).toEqual({
      type: types.TASK_CHANGE_SEQUENCE,
      task: {},
      actualSequence: 1,
      encounterId: 'GUID',
    });
  });

  it('taskingStatusUpdateSucceded should create TASK_STATUSUPDATE_SUCCEDED action', () => {
    expect(taskingActions.taskingStatusUpdateSucceded({})).toEqual({
      type: types.TASK_STATUSUPDATE_SUCCEDED,
      updatedresult: {},
    });
  });

  it('taskingStatusUpdateFailed should create TASK_STATUSUPDATE_FAILED action', () => {
    expect(taskingActions.taskingStatusUpdateFailed('Error in API response')).toEqual({
      type: types.TASK_STATUSUPDATE_FAILED,
      errorMessage: 'Error in API response',
    });
  });

  it('taskSequenceChangeSucceded should create TASK_CHANGE_SEQUENCE_SUCCEDED action', () => {
    expect(taskingActions.taskSequenceChangeSucceded(5)).toEqual({
      type: types.TASK_CHANGE_SEQUENCE_SUCCEDED,
      updatedSequence: 5,
    });
  });

  it('taskSequenceChangeFailed should create TASK_CHANGE_SEQUENCE_FAILED action', () => {
    expect(taskingActions.taskSequenceChangeFailed('Error in API response')).toEqual({
      type: types.TASK_CHANGE_SEQUENCE_FAILED,
      errorMessage: 'Error in API response',
    });
  });

  it('taskingGetRoomsList should create TASK_GET_ROOM_LIST action', () => {
    expect(taskingActions.taskingGetRoomsList('GUID', 3, false)).toEqual({
      type: types.TASK_GET_ROOM_LIST,
      encounterId: 'GUID',
      id: 3,
      isRoomsClicked: false,
    });
  });

  it('fetchingTasksForEncounter should create TASK_FETCH_TASKS_FOR_ENCOUNTER action', () => {
    expect(taskingActions.fetchingTasksForEncounter('GUID')).toEqual({
      type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER,
      encounterId: 'GUID',
    });
  });

  it('fetchingTasksForEncounterCompleted should create action', () => {
    expect(taskingActions.fetchingTasksForEncounterCompleted({
      result: [], entities: {}, stats: {} })).toEqual({
      type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER_COMPLETED,
      result: [],
      entities: {},
      stats: {},
    });
  });

  it('fetchingTasksForEncounterFailed should create TASK_FETCH_TASKS_FOR_ENCOUNTER_FAILED action', () => {
    expect(taskingActions.fetchingTasksForEncounterFailed('Error in API response')).toEqual({
      type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER_FAILED,
      errorMessage: 'Error in API response',
    });
  });

  it('taskSaveRequested should create TASK_SAVE_REQUESTED action', () => {
    expect(taskingActions.taskSaveRequested({ patientStatusTypeId: '1013',
      taskDetails: 'New task',
      encounterId: 'GUID' })).toEqual({
      type: types.TASK_SAVE_REQUESTED,
      task: {
        patientStatusTypeId: '1013',
        taskDetails: 'New task',
        encounterId: 'GUID',
      },
    });
  });

  it('taskSaveFailed should create TASK_SAVE_FAILED action', () => {
    expect(taskingActions.taskSaveFailed('Error in API Response')).toEqual({
      type: types.TASK_SAVE_FAILED,
      message: 'Error in API Response',
    });
  });

  it('taskSaveSuccess should create TASK_SAVE_SUCCESS action', () => {
    expect(taskingActions.taskSaveSuccess({})).toEqual({
      type: types.TASK_SAVE_SUCCESS,
      task: {},
    });
  });

  it('toggleVisiblity should create FILTERS_TOGGLE_VISIBLITY action', () => {
    expect(filterActions.toggleVisiblity()).toEqual({
      type: types.FILTERS_TOGGLE_VISIBLITY,
    });
  });

  it('toggleVisiblity should create NESTEDTASK_TOGGLE_VISIBLITY action', () => {
    expect(nestedTaskActions.toggleVisiblity()).toEqual({
      type: types.NESTEDTASK_TOGGLE_VISIBLITY,
    });
  });

  it('noTaskGridToggle should create NOTASKGRID_TOGGLE_VISIBLITY action', () => {
    expect(nestedTaskActions.noTaskGridToggle()).toEqual({
      type: types.NOTASKGRID_TOGGLE_VISIBLITY,
    });
  });

  it('loadPatients should create PATIENTS_LOAD action', () => {
    expect(roomSliderActions.loadPatients()).toEqual({
      type: types.PATIENTS_LOAD,
    });
  });

  it('patientToggleSelected should create PATIENT_TOGGLE_SELECTED action', () => {
    expect(roomSliderActions.patientToggleSelected(9365)).toEqual({
      type: types.PATIENT_TOGGLE_SELECTED,
      patientId: 9365,
    });
  });

  it('onTaskAlertClick should create TASK_ALERT_CLICK action', () => {
    expect(taskingActions.onTaskAlertClick({}, {})).toEqual({
      type: types.TASK_ALERT_CLICK,
      task: {},
      selectedIcon: {},
    });
  });
});
