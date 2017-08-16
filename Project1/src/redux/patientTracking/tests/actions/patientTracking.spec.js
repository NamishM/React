
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('patientTracking action', () => {
  it('getPatientTrackingsData should create PATIENT_TRACKING_FETCH_REQUESTED', () => {
    expect(actions.getPatientTrackingsData(1, {}, {})).toEqual({
      type: types.PATIENT_TRACKING_FETCH_REQUESTED,
      page: 1,
      sortColumns: {},
      sortColumnPrecedence: {},
    });
  });

  it('getPatientTrackingSucceeded should create PATIENT_TRACKING_FETCH_SUCCEEDED', () => {
    expect(actions.getPatientTrackingSucceeded([], [], {})).toEqual({
      type: types.PATIENT_TRACKING_FETCH_SUCCEEDED,
      result: [],
      entities: [],
      stats: {},
    });
  });

  it('getPatientTrackingFailed should create PATIENT_TRACKING_FETCH_FAILED', () => {
    expect(actions.getPatientTrackingFailed('error in API response')).toEqual({
      type: types.PATIENT_TRACKING_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('sortColumn should create PATIENT_TRACKING_SORT_COLUMN', () => {
    expect(actions.sortColumn(1)).toEqual({
      type: types.PATIENT_TRACKING_SORT_COLUMN,
      sortedBy: 1,
    });
  });

  it('getNextPage should create PATIENT_TRACKING_NEXT_PAGE', () => {
    expect(actions.getNextPage()).toEqual({
      type: types.PATIENT_TRACKING_NEXT_PAGE,
    });
  });

  it('skipPatientTrackingNextDataFlow should create SKIP_NEXT_PATIENT_TRACKING_DATA', () => {
    expect(actions.skipPatientTrackingNextDataFlow()).toEqual({
      type: types.SKIP_NEXT_PATIENT_TRACKING_DATA,
    });
  });

  it('onRefreshClick should create REFRESH_PATIENT_TRACKING_DATA', () => {
    expect(actions.onRefreshClick()).toEqual({
      type: types.REFRESH_PATIENT_TRACKING_DATA,
    });
  });
});
