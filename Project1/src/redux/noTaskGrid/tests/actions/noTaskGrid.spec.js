
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('noTaskGrid action', () => {
  it('getNoTaskGridData should create NO_TASKGRID_FETCH_REQUESTED', () => {
    expect(actions.getNoTaskGridData(1)).toEqual({
      type: types.NO_TASKGRID_FETCH_REQUESTED,
      page: 1,
    });
  });

  it('getNoTaskGridSucceeded should create NO_TASKGRID_FETCH_SUCCEEDED', () => {
    expect(actions.getNoTaskGridSucceeded([], [], {})).toEqual({
      type: types.NO_TASKGRID_FETCH_SUCCEEDED,
      result: [],
      entities: [],
      stats: {},
    });
  });

  it('getNoTaskGridFailed should create NO_TASKGRID_FETCH_FAILED', () => {
    expect(actions.getNoTaskGridFailed()).toEqual({
      type: types.NO_TASKGRID_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('checkOutPatientFailed should create CHECKOUT_ON_NO_TASKGRID_DATA_FAILED', () => {
    expect(actions.checkOutPatientFailed()).toEqual({
      type: types.CHECKOUT_ON_NO_TASKGRID_DATA_FAILED,
      message: 'error in API response',
    });
  });

  it('checkOutPatientRequested should create CHECKOUT_ON_NO_TASKGRID_DATA_REQUESTED', () => {
    expect(actions.checkOutPatientRequested('D5C6C7F1-727D-43FD-A915-710F17F870D9', 1, 8)).toEqual({
      type: types.CHECKOUT_ON_NO_TASKGRID_DATA_REQUESTED,
      id: 'D5C6C7F1-727D-43FD-A915-710F17F870D9',
      currentRoomId: 8,
      locationId: 1,
    });
  });

  it('getNextPage should create NO_TASKGRID_NEXT_PAGE', () => {
    expect(actions.getNextPage()).toEqual({
      type: types.NO_TASKGRID_NEXT_PAGE,
    });
  });

  it('skipNoTaskGridNextDataFlow should create SKIP_NEXT_NO_TASKGRID_DATA', () => {
    expect(actions.skipNoTaskGridNextDataFlow()).toEqual({
      type: types.SKIP_NEXT_NO_TASKGRID_DATA,
    });
  });

  it('checkOutPatientSucceded should create CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED', () => {
    expect(actions.checkOutPatientSucceded(true)).toEqual({
      type: types.CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED,
      checkoutDetails: true,
    });
  });

  it('noTaskRoomUpdateFailed should create NO_TASKGRID_ROOM_UPDATE_FAILED', () => {
    expect(actions.noTaskRoomUpdateFailed()).toEqual({
      type: types.NO_TASKGRID_ROOM_UPDATE_FAILED,
      errorMessage: 'error in API response',
    });
  });

  it('noTaskGetRoomsList should create NO_TASKGRID_GET_ROOM_LIST', () => {
    expect(actions.noTaskGetRoomsList('872C0AF9-E033-40D7-9FCF-000FECCAE495', 'D5C6C7F1-727D-43FD-A915-710F17F870D9', true)).toEqual({
      type: types.NO_TASKGRID_GET_ROOM_LIST,
      encounterId: '872C0AF9-E033-40D7-9FCF-000FECCAE495',
      id: 'D5C6C7F1-727D-43FD-A915-710F17F870D9',
      isRoomsClicked: true,
    });
  });

  it('noTaskRoomUpdateRequested should create NO_TASKGRID_ROOM_UPDATE_REQUESTED', () => {
    expect(actions.noTaskRoomUpdateRequested('872C0AF9-E033-40D7-9FCF-000FECCAE495', 1, 1, 1)).toEqual({
      type: types.NO_TASKGRID_ROOM_UPDATE_REQUESTED,
      encounterId: '872C0AF9-E033-40D7-9FCF-000FECCAE495',
      taskId: 1,
      existingRoomId: 1,
      newRoomId: 1,
    });
  });

  it('noTaskRoomUpdateSucceeded should create NO_TASKGRID_ROOM_UPDATE_SUCCEEDED', () => {
    expect(actions.noTaskRoomUpdateSucceeded('872C0AF9-E033-40D7-9FCF-000FECCAE495', 1, 1, 1, 'Room assigned to current person')).toEqual({
      type: types.NO_TASKGRID_ROOM_UPDATE_SUCCEEDED,
      encounterId: '872C0AF9-E033-40D7-9FCF-000FECCAE495',
      taskId: 1,
      existingRoomId: 1,
      newRoomId: 1,
      newRoomDesc: 'Room assigned to current person',
    });
  });
});
