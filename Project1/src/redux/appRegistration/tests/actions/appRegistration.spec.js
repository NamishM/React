
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const endPointDesc = {
  name: 'Appointments',
  isSelected: true,
};

describe('appRegistration actions', () => {
  it('registerApplication should create APP_REGISTRATION_REGISTERED action.', () => {
    expect(actions.registerApplication('Appointments')).toEqual({
      type: types.APP_REGISTRATION_REGISTERED,
      appName: 'Appointments',
    });
  });

  it('unregisterApplication should create APP_REGISTRATION_UNREGISTERED action.', () => {
    expect(actions.unregisterApplication()).toEqual({
      type: types.APP_REGISTRATION_UNREGISTERED,
    });
  });

  it('selectEndpoint should create APP_REGISTRATION_ENDPOINT_SELECTED action.', () => {
    expect(actions.selectEndpoint(endPointDesc)).toEqual({
      type: types.APP_REGISTRATION_ENDPOINT_SELECTED,
      endpoint: endPointDesc,
    });
  });

  it('unselectEndpoint should create APP_REGISTRATION_ENDPOINT_UNSELECTED action.', () => {
    expect(actions.unselectEndpoint(endPointDesc)).toEqual({
      type: types.APP_REGISTRATION_ENDPOINT_UNSELECTED,
      endpoint: endPointDesc,
    });
  });
});
