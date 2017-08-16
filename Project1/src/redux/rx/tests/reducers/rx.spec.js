
import rx from '../../reducers/Rx';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const authResult = {
  token: {
    expirationDate: '2016-07-04T13:30:05.813+0000',
    token: 'b61f3c5d.9ab5.43b3.ac19.8ac93ba5da5c',
  },
};

// const _properties = {
//  patientKey: 'default',
//  viewMode: 'full',
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

describe('Rx reducer', () => {
  it('should handle ON_INIT', () => {
    const state = {
      patientExternalId: 'paltrowbruce',
      encounterId: '',
    };
    deepFreeze(state);
    expect(
      rx(state, {
        type: types.ON_INIT,
      }),
    ).toEqual({
      patientExternalId: undefined,
      encounterId: undefined,
    });
  });

  it('should handle AUTHENTICATION_SUCCESS', () => {
    const state = {
      token: authResult.token.token,
      isAuthenticated: true,
    };
    deepFreeze(state);

    expect(
      rx(state, {
        type: types.AUTHENTICATION_SUCCESS,
        authResult,
      }),
    ).toEqual({
      token: authResult.token.token,
      isAuthenticated: true,
    });
  });

  it('should handle SCRIPT_LOAD_FAILED', () => {
    const state = {
      token: null,
    };
    deepFreeze(state);

    expect(
      rx(state, {
        type: types.SCRIPT_LOAD_FAILED,
      }),
    ).toEqual({
      token: null,
    });
  });

  it('should handle WIDGET_OPENED', () => {
    const state = {
      isMedWidgetOpened: true,
      widgetName: 'medications',
    };
    deepFreeze(state);

    expect(
      rx(state, {
        type: types.WIDGET_OPENED,
        widgetName: 'medications',
      }),
    ).toEqual({
      isMedWidgetOpened: true,
      widgetName: 'medications',
    });
  });

  it('should handle WIDGET_DATA_ADDED', () => {
    const state = {
      data: widgetData,
      widgetName: 'Allergy',
      apiMethod: 'Allergy',
    };
    deepFreeze(state);

    expect(
      rx(state, {
        type: types.WIDGET_STATUS_PENDING,
        data: widgetData,
        widgetName: 'Allergy',
        apiMethod: 'Allergy',
      }),
    ).toEqual({
      data: widgetData,
      widgetName: 'Allergy',
      apiMethod: 'Allergy',
    });
  });

  it('should handle WIDGET_DATA_ADDED_SUCCESSFULLY', () => {
    const state = {
      data: widgetData,
      widgetName: 'Allergy',
    };
    deepFreeze(state);

    expect(
      rx(state, {
        type: types.WIDGET_STATUS_SUCCESS,
        data: widgetData,
        widgetName: 'Allergy',
      }),
    ).toEqual({
      data: widgetData,
      widgetName: 'Allergy',
    });
  });

  it('should handle WIDGET_DATA_ADDED_FAILED', () => {
    const state = {
      msg: 'Save Allergy falied',
      data: widgetData,
      widgetName: 'Allergy',
    };
    deepFreeze(state);

    expect(
      rx(state, {
        type: types.WIDGET_STATUS_FAILED,
        msg: 'Save Allergy falied',
        data: widgetData,
        widgetName: 'Allergy',
      }),
    ).toEqual({
      msg: 'Save Allergy falied',
      data: widgetData,
      widgetName: 'Allergy',
    });
  });
});
