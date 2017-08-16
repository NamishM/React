import moduleName from '../../constants/moduleName';
import * as types from '../../constants/ActionTypes';
import { generateActions } from '../../../appointments/actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const actions = generateActions(moduleName);

describe('encounters action', () => {
  it('encounters should check for moduleName', () => {
    expect(moduleName).toEqual('ENCOUNTERS');
  });

  it('setAppointmentFilter should call APPOINTMENT_SET_FILTER', () => {
    expect(
      actions.setAppointmentFilter('1/1/2007', '1/2/2007', null),
    ).toEqual({
      type: types.APPOINTMENT_SET_FILTER,
      startDate: '1/1/2007',
      endDate: '1/2/2007',
      personId: null,
    });
  });

  it('getAppointmentsData should create APPOINTMENT_FETCH_REQUESTED action', () => {
    expect(
      actions.getAppointmentsData(
        1,
        {
          0: {
            name: 'PersonDeskDate',
            label: 'Time',
            state: 'asc',
          },
        },
        [0],
        '5/25/2016',
        '5/26/2016',
        9783,
      ),
    ).toEqual({
      type: types.APPOINTMENT_FETCH_REQUESTED,
      page: 1,
      sortColumns: {
        0: {
          name: 'PersonDeskDate',
          label: 'Time',
          state: 'asc',
        },
      },
      sortColumnPrecedence: [0],
      startDate: '5/25/2016',
      endDate: '5/26/2016',
      personId: 9783,
    });
  });

  it('getAppointmentFailed should create APPOINTMENT_FETCH_FAILED action', () => {
    expect(
      actions.getAppointmentFailed('error in API response'),
    ).toEqual({
      type: types.APPOINTMENT_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('getAppointmentFailed should create APPOINTMENT_FETCH_FAILED action with no error message', () => {
    expect(
      actions.getAppointmentFailed(),
    ).toEqual({
      type: types.APPOINTMENT_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('onSelection should create APPOINTMENT_SELECTION action', () => {
    expect(actions.onSelection('{GUID}')).toEqual({
      type: types.APPOINTMENT_SELECTION,
      id: '{GUID}',
    });
  });

  it('onSelection should create APPOINTMENT_SELECTION action with no parameter', () => {
    expect(actions.onSelection()).toEqual({
      type: types.APPOINTMENT_SELECTION,
      id: -1,
    });
  });

  it('onSearchClick should create APPOINTMENT_SEARCH_VIEW action', () => {
    expect(actions.searchClick()).toEqual({
      type: types.APPOINTMENT_SEARCH_VIEW,
    });
  });

  it('appointmentView should create APPOINTMENT_VIEW action', () => {
    expect(actions.appointmentView()).toEqual({
      type: types.APPOINTMENT_VIEW,
    });
  });

  it('sortColumn should create APPOINTMENT_SORT_COLUMN action', () => {
    expect(actions.sortColumn(0, 1)).toEqual({
      type: types.APPOINTMENT_SORT_COLUMN,
      sortedBy: 0,
    });
  });

  it('getAppointmentSucceeded should create APPOINTMENT_FETCH_SUCCEEDED action', () => {
    expect(actions.getAppointmentSucceeded(
      [], {}, {},
    )).toEqual({
      type: types.APPOINTMENT_FETCH_SUCCEEDED,
      result: [],
      entities: {},
      stats: {},
    });
  });

  it('getNextPage should create APPOINTMENT_NEXT_PAGE action', () => {
    expect(actions.getNextPage()).toEqual({
      type: types.APPOINTMENT_NEXT_PAGE,
    });
  });

  it('skipAppointmentNextDataFlow should create SKIP_NEXT_APPOINTMENT_DATA action', () => {
    expect(actions.skipAppointmentNextDataFlow()).toEqual({
      type: types.SKIP_NEXT_APPOINTMENT_DATA,
    });
  });

  it('clearAppointments should create APPOINTMENT_CLEAR action', () => {
    expect(actions.clearAppointments()).toEqual({
      type: types.APPOINTMENT_CLEAR,
    });
  });
});
