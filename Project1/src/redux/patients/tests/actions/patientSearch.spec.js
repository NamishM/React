
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;
const searchCriteriaModel = {
  firstName: '',
  dob: '',
  phone: '',
  lastName: '',
  sharedId: '',
  ssn: '',
  ssnMask: '999-99-9999',
  phoneMask: '(999)999-9999',
};
describe('patientsearch action', () => {
  it('Change Search View', () => {
    expect(actions.onChangeSearchView(searchCriteriaModel)).toEqual({
      type: types.ADVANCE_SEARCH_TOGGLE,
      searchCriteria: searchCriteriaModel,
    });
  });
  it('Clear Search', () => {
    expect(actions.onClearClicked()).toEqual({
      type: types.CLEAR_FIELDS,
    });
  });
  it('Date Focus', () => {
    expect(actions.onFocusDate(false)).toEqual({
      type: types.DATE_VIEW_CHANGE,
      isDate: false,
    });
  });
  it('Sort Column', () => {
    expect(actions.sortColumn(0)).toEqual({
      type: types.SORT_COLUMN,
      sortedBy: 0,
    });
  });
  it('SEARCH SUCCEEDED', () => {
    expect(actions.onSearchSucceeded([], [], [])).toEqual({
      type: types.SEARCH_SUCCEEDED,
      result: [],
      entities: [],
      stats: [],
    });
  });
  it('SEARCH FAILED', () => {
    expect(actions.onSearchFailed('Error')).toEqual({
      type: types.SEARCH_FAILED,
      message: 'Error',
    });
  });
  it('Search Clicked', () => {
    expect(actions.onSearchClicked(searchCriteriaModel, '2')).toEqual({
      type: types.SEARCH_INIT,
      searchCriteria: searchCriteriaModel,
      page: '2',
    });
  });
  it('LATEST ENCOUNTER FETCH SUCCEEDED', () => {
    expect(actions.getLatestEncounterSucceeded('05/20/2016')).toEqual({
      type: types.LATEST_ENCOUNTER_FETCH_SUCCEEDED,
      encounter: '05/20/2016',
    });
  });
  it('LATEST ENCOUNTER FETCH FAILED', () => {
    expect(actions.getLatestEncounterFailed('error in API response')).toEqual({
      type: types.LATEST_ENCOUNTER_FETCH_FAILED,
      message: 'error in API response',
    });
  });
  it('PATIENT SELECTION', () => {
    expect(actions.onSelection(-1)).toEqual({
      type: types.PATIENT_SELECTION,
      id: -1,
    });
  });
  it('GET INFINITE NEXT PATIENT DATA', () => {
    expect(actions.getNextPatientData()).toEqual({
      type: types.GET_NEXT_PATIENT_DATA,
    });
  });
  it('Skip Patient Next Data Flow', () => {
    expect(actions.skipPatientNextDataFlow()).toEqual({
      type: types.SKIP_NEXT_PATIENT_DATA,
    });
  });
  it('Last Page Arrived', () => {
    expect(actions.lastPageArrived()).toEqual({
      type: types.LAST_PAGE_ARRIVED,
    });
  });
});
