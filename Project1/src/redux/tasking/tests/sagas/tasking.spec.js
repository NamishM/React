import {
  call,
  select,
  put,
} from 'redux-saga/effects';
import {
  delay,
} from 'redux-saga';
import {
  getPTStatusDetails,
  taskingStatusUpdate,
  taskingChangeSequence,
  saveTaskSaga,
  _pollForTasks,
} from '../../sagas';
import {
  getTaskingDetails,
  updateTaskingStatus,
  getUpdatedSequence,
  saveTask,
} from '../../api';
import { getFilterCriteria } from '../../../chartBinFilter/reducers/chartBinFilter';
import * as actions from '../../actions/taskingActions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const defaultProviders = [{
  value: 97704465753,
}];
const defaultRooms = [{
  value: 6,
}];
const defaultPatientStatusTypes = [{
  color: 'rgb(192,192,192)',
  label: 'Exam',
  selected: true,
  statusType: 4,
  value: 4,
},
{
  color: 'rgb(0,128,0)',
  label: 'MDE',
  selected: true,
  statusType: 4,
  value: 8,
},
{
  color: 'rgb(255,0,0)',
  label: 'X-Ray',
  selected: true,
  statusType: 4,
  value: 7,
},
];
const taskingDetails =
  {
    entities: {
      patientTrackingStatuses: {
        5: {
          birthDate: '1966-04-26T00:00:00',
          createdBy: 27,
          createdByDateTime: '2017-03-21T14:42:14.047',
          encounterId: '6d3bc5e3-b196-4239-af10-3553b7619918',
          linkedSourceId: 7,
          linkedSourceType: 1,
          modifiedBy: 27,
          modifiedByDateTime: '2017-03-21T14:42:14.047',
          pT_PatientStatusTypeId: 4,
          patientName: 'Skinner Michael',
          personDeskId: 97704465753,
          personId: 9769,
          roomId: 6,
          taskDetails: 'Exam',
          taskId: 5,
          taskSetSequence: 4,
          taskStatusId: 1,
        },
      },
    },
    result: {
      patientTrackingStatuses: [5],
    },
    stats:
    {
      endIndex: 0,
      pageNumber: 1,
      pageSize: 999,
      startIndex: 0,
      totalPages: 1,
      totalResults: 1,
    },
  };

const request = {
  task: {
    taskId: 95,
    pT_PatientStatusTypeId: 14,
    linkedSourceId: null,
    linkedSourceType: 0,
    taskStatusId: 2,
    taskSetSequence: 2,
    taskDetails: null,
    encounterId: 'eff1d2b8-acc1-4ffa-9da3-e298dc41e3c9',
    roomId: 1020,
    createdBy: 27,
    createdByDateTime: '2017-04-27T12:39:16.937',
    modifiedBy: 27,
    modifiedByDateTime: '2017-05-16T16:17:57.47',
    patientName: 'Zaborowski Julienne',
    personId: 76775312,
    personDeskId: 97704465753,
    birthDate: '1986-09-03T00:00:00',
  },
};

const changeSeqRequest = {
  task: {
    taskId: 95,
    pT_PatientStatusTypeId: 14,
    linkedSourceId: null,
    linkedSourceType: 0,
    taskStatusId: 2,
    taskSetSequence: 4,
    taskDetails: null,
    encounterId: 'GUID',
    roomId: 1020,
    createdBy: 27,
    createdByDateTime: '2017-04-27T12:39:16.937',
    modifiedBy: 27,
    modifiedByDateTime: '2017-05-16T16:17:57.47',
    patientName: 'Zaborowski Julienne',
    personId: 76775312,
    personDeskId: 97704465753,
    birthDate: '1986-09-03T00:00:00',
  },
  actualSequence: 4,
  encounterId: 'GUID',
};

const updatedTask = {
  taskId: 95,
  pT_PatientStatusTypeId: 14,
  linkedSourceId: null,
  linkedSourceType: 0,
  taskStatusId: 4,
  taskSetSequence: 2,
  taskDetails: null,
  encounterId: 'GUID',
  roomId: 1020,
  createdBy: 27,
  createdByDateTime: '2017-04-27T12:39:16.937',
  modifiedBy: 27,
  modifiedByDateTime: '2017-05-16T16:17:57.47',
  patientName: 'Zaborowski Julienne',
  personId: 76775312,
  personDeskId: 97704465753,
  birthDate: '1986-09-03T00:00:00',
};

describe('tasking saga: getPTStatusDetails', () => {
  it('should call our getTaskingDetails ' +
    'API and then call the succeed action', () => {
    const generator = getPTStatusDetails();

    // move to the first yield statement to get user id
    let next = generator.next();

    expect(next.value).toEqual(
      select(getFilterCriteria));

    // move to the second yield statement
    next = generator.next({
      selectedProviders: defaultProviders,
      taskGroups: defaultPatientStatusTypes,
      selectedRooms: defaultRooms,
      selectedPersonId: 9820,
    });

    expect(next.value).toEqual(
      call(
        getTaskingDetails,
        '97704465753',
        '6',
        'RoomId',
        '4,8,7',
        9820,
      ));

    next = generator.next(taskingDetails);

    expect(next.value).toEqual(put(actions.getPTStatusDetailsSucceeded(
      taskingDetails.result,
      taskingDetails.entities,
      taskingDetails.stats,
    )));
  });
});

describe('tasking saga: getPTStatusDetails', () => {
  it('should call our getPTStatusDetails ' +
    'API and then call the failed action', () => {
    const generator = getPTStatusDetails();

    // move to the first yield statement to get user id
    let next = generator.next();

    expect(next.value).toEqual(
      select(getFilterCriteria));

    // move to the second yield statement
    next = generator.next({
      selectedProviders: defaultProviders,
      selectedRooms: defaultRooms,
      selectedPatientStatusTypes: defaultPatientStatusTypes,
    });

    // Mock the failure of our API call
    next = generator.throw(new Error('Error in API response'));

    expect(next.value).toEqual(put(actions.getPTStatusDetailsFailed('Error in API response')));
  });
});

describe('tasking saga: taskingStatusUpdate', () => {
  it('should call our updateTaskingStatus ' +
    'API and then call the succeed action', () => {
    const generator = taskingStatusUpdate(request);

    // move to the first yield statement
    let next = generator.next();

    expect(next.value).toEqual(
      call(
        updateTaskingStatus,
        request.task,
      ));

    next = generator.next(updatedTask);

    expect(next.value).toEqual(put(actions.taskingStatusUpdateSucceded(updatedTask)));

    next = generator.next();

    const isAnyActiveTask = true;
    next = generator.next(isAnyActiveTask);
  });
});

describe('tasking saga: taskingStatusUpdate', () => {
  it('should call our updateTaskingStatus ' +
    'API and then call the failed action', () => {
    const generator = taskingStatusUpdate(request);

    // move to the first yield statement
    let next = generator.next();

    expect(next.value).toEqual(
      call(
        updateTaskingStatus,
        request.task,
      ));

    // Mock the failure of our API call
    next = generator.throw(new Error('Error in API response'));

    expect(next.value).toEqual(put(actions.taskingStatusUpdateFailed('Error in API response')));
  });
});

describe('tasking saga: taskingChangeSequence', () => {
  it('should call our updateTaskingStatus ' +
    'API and then call the succeed action', () => {
    const generator = taskingChangeSequence(changeSeqRequest);

    // move to the first yield statement
    let next = generator.next();

    expect(next.value).toEqual(
      call(
        updateTaskingStatus,
        changeSeqRequest.task,
      ));

    next = generator.next(updatedTask);

    expect(next.value).toEqual(put(actions.taskingStatusUpdateSucceded(updatedTask)));

    next = generator.next();

    expect(next.value).toEqual(call(
      getUpdatedSequence,
      'GUID',
      4,
    ));

    next = generator.next({
      ...changeSeqRequest.task,
      taskSetSequence: 5,
    });

    expect(next.value).toEqual(put(actions.taskSequenceChangeSucceded({
      ...changeSeqRequest.task,
      taskSetSequence: 5,
    })));
  });
});

describe('tasking saga: taskingChangeSequence', () => {
  it('should call our updateTaskingStatus ' +
    'API and then call the failed action', () => {
    const generator = taskingChangeSequence(request);

    // move to the first yield statement
    let next = generator.next();

    expect(next.value).toEqual(
      call(
        updateTaskingStatus,
        request.task,
      ));

    // Mock the failure of our API call
    next = generator.throw(new Error('Error in API response'));

    expect(next.value).toEqual(put(actions.taskSequenceChangeFailed('Error in API response')));
  });
});

describe('tasking saga: saveTaskSaga', () => {
  it('should call our saveTask ' +
    'API and then call the succeed action', () => {
    const generator = saveTaskSaga(request);

    // move to the first yield statement
    let next = generator.next();

    expect(next.value).toEqual(
      call(
        saveTask,
        request.task,
      ));

    // Mock the failure of our API call
    next = generator.throw(new Error('Error in API response'));

    expect(next.value).toEqual(put(actions.taskSaveFailed('Error in API response')));
  });
});

describe('tasking saga: saveTaskSaga', () => {
  it('should call our saveTask ' +
    'API and then call the failed action', () => {
    const generator = saveTaskSaga(request);

    // move to the first yield statement
    let next = generator.next();

    expect(next.value).toEqual(
      call(
        saveTask,
        request.task,
      ));

    next = generator.next(updatedTask);

    expect(next.value).toEqual(put(actions.taskSaveSuccess(updatedTask)));
  });
});

describe('tasking saga: _pollForTasks', () => {
  it('should call our getPTStatusDetails', () => {
    const generator = _pollForTasks(10);
    let next = generator.next();
    let counter = 10;
    while (counter > 0) {
      expect(next.value).toEqual(put(actions.tickRefreshCounter(counter)));

      next = generator.next();
      counter -= 1;
      expect(next.value).toEqual(call(delay, 1000));
      next = generator.next();
    }
    expect(next.value).toEqual(call(getPTStatusDetails));
  });
});
