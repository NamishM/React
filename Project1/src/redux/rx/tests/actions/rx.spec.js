
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';


const describe = global.describe;
const it = global.test;

const expect = global.expect;
// const widgetProperties = {
//  patientKey: 'default',
//  readOnly: false,
//  viewMode: 'full',
//  suppress: 'dateEnteredColumn, clinicalReportButton,  deleteButton, changeViewButton',
// };

const widgetData = {
  PersonId: 9365,
  Name: 'Allergic to Peanuts',
  AllergyExternalId: '434447',
  Severity:
  {
    Reaction: 'hives reaction',
  },
};

describe('Rx action', () => {
  it('setInitialData should create SET_INITIAL_DATA action', () => {
    expect(actions.setInitialData('sprovider88', 'Demo1234', 'sr98986',
      'svendor52')).toEqual({
      type: types.SET_INITIAL_DATA,
      userName: 'sprovider88',
      password: 'Demo1234',
      practiceId: 'sr98986',
      systemName: 'svendor52',
    });
  });

  it('initRx should create ON_INIT action', () => {
    expect(actions.initRx('paltrowbruce', '')).toEqual({
      type: types.ON_INIT,
      patientId: 'paltrowbruce',
      encounterId: '',
    });
  });
  it('authenticationSuccess should call AUTHENTICATION_SUCCESS', () => {
    expect(
      actions.authenticationSuccess(true)).toEqual({
      type: types.AUTHENTICATION_SUCCESS,
      authResult: true,
    });
  });
  it('authenticationFailed should call AUTHENTICATION_FAILURE', () => {
    expect(
      actions.authenticationFailed('Authentication falied')).toEqual({
      type: types.AUTHENTICATION_FAILURE,
      msg: 'Authentication falied',
    });
  });
  it('scriptLoaderFailed should call SCRIPT_LOAD_FAILED', () => {
    expect(
      actions.scriptLoaderFailed('allergies', '9820')).toEqual({
      type: types.SCRIPT_LOAD_FAILED,
      widgetName: 'allergies',
      id: '9820',
    });
  });
  it('widgetOpened should call WIDGET_OPENED', () => {
    expect(
      actions.widgetOpened('medications')).toEqual({
      type: types.WIDGET_OPENED,
      widgetName: 'medications',
    });
  });
  it('widgetDataAdded should call WIDGET_DATA_ADDED', () => {
    expect(
      actions.widgetDataAdded(widgetData, 'allergies', 'Allergy')).toEqual({
      type: types.WIDGET_DATA_ADDED,
      data: widgetData,
      widgetName: 'allergies',
      apiMethod: 'Allergy',
    });
  });

  it('widgetDataAddedFailed should call WIDGET_DATA_ADDED_FAILED', () => {
    expect(
      actions.widgetDataAddedFailed(widgetData, 'allergies', 'Save Allergy falied')).toEqual({
      type: types.WIDGET_DATA_ADDED_FAILED,
      data: widgetData,
      widgetName: 'allergies',
      msg: 'Save Allergy falied',
    });
  });
});
