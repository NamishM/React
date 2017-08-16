
import { appRegistration } from '../../reducers/appRegistration';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  appName: null,
  registrationGuid: null,
  endpoints: [
    { name: 'Appointments', isSelected: false },
    { name: 'Patients', isSelected: false },
    { name: 'Users', isSelected: false },
    { name: 'Messaging', isSelected: false },
    { name: 'Documents', isSelected: false },
    { name: 'Rx', isSelected: false },
    { name: 'Orders', isSelected: false },
    { name: 'Diagnosis', isSelected: false },
    { name: 'Vitals', isSelected: false },
    { name: 'Social History', isSelected: false },
  ],
  isRegistered: false,
};

describe('appRegistration reducer', () => {
  it('should handle initial state', () => {
    expect(
      appRegistration(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle APP_REGISTRATION_REGISTERED', () => {
    const state = {
      appName: null,
      registrationGuid: null,
      isRegistered: false,
    };
    deepFreeze(state);

    expect(
      appRegistration(state, {
        type: types.APP_REGISTRATION_REGISTERED,
        appName: 'Appointments',
      }),
    ).toEqual({
      appName: 'Appointments',
      registrationGuid: '10F26E88-6F04-41A4-8411-E718E0B9C448',
      isRegistered: true,
    });
  });

  it('should handle APP_REGISTRATION_UNREGISTERED', () => {
    const state = {
      registrationGuid: '10F26E88-6F04-41A4-8411-E718E0B9C448',
      isRegistered: true,
    };
    deepFreeze(state);

    expect(
      appRegistration(state, {
        type: types.APP_REGISTRATION_UNREGISTERED,
      }),
    ).toEqual({
      registrationGuid: null,
      isRegistered: false,
    });
  });

  it('should handle APP_REGISTRATION_ENDPOINT_SELECTED', () => {
    const state = {
      endpoints: [
        { name: 'Appointments', isSelected: true },
        { name: 'Patients', isSelected: false },
        { name: 'Users', isSelected: false },
        { name: 'Messaging', isSelected: false },
        { name: 'Documents', isSelected: false },
        { name: 'Rx', isSelected: false },
        { name: 'Orders', isSelected: false },
        { name: 'Diagnosis', isSelected: false },
        { name: 'Vitals', isSelected: false },
        { name: 'Social History', isSelected: false },
      ],
    };
    deepFreeze(state);

    expect(
      appRegistration(state, {
        type: types.APP_REGISTRATION_ENDPOINT_SELECTED,
        endpoint: {
          name: 'Appointments',
          isSelected: true,
        },
      }),
    ).toEqual({
      endpoints: [
        { name: 'Appointments', isSelected: true },
        { name: 'Patients', isSelected: false },
        { name: 'Users', isSelected: false },
        { name: 'Messaging', isSelected: false },
        { name: 'Documents', isSelected: false },
        { name: 'Rx', isSelected: false },
        { name: 'Orders', isSelected: false },
        { name: 'Diagnosis', isSelected: false },
        { name: 'Vitals', isSelected: false },
        { name: 'Social History', isSelected: false },
      ],
    });
  });

  it('should handle APP_REGISTRATION_ENDPOINT_UNSELECTED', () => {
    const state = {
      endpoints: [
        { name: 'Appointments', isSelected: true },
        { name: 'Patients', isSelected: false },
        { name: 'Users', isSelected: false },
        { name: 'Messaging', isSelected: false },
        { name: 'Documents', isSelected: false },
        { name: 'Rx', isSelected: false },
        { name: 'Orders', isSelected: false },
        { name: 'Diagnosis', isSelected: false },
        { name: 'Vitals', isSelected: false },
        { name: 'Social History', isSelected: false },
      ],
    };
    deepFreeze(state);

    expect(
      appRegistration(state, {
        type: types.APP_REGISTRATION_ENDPOINT_UNSELECTED,
        endpoint: {
          name: 'Appointments',
          isSelected: true,
        },
      }),
    ).toEqual({
      endpoints: [
        { name: 'Appointments', isSelected: false },
        { name: 'Patients', isSelected: false },
        { name: 'Users', isSelected: false },
        { name: 'Messaging', isSelected: false },
        { name: 'Documents', isSelected: false },
        { name: 'Rx', isSelected: false },
        { name: 'Orders', isSelected: false },
        { name: 'Diagnosis', isSelected: false },
        { name: 'Vitals', isSelected: false },
        { name: 'Social History', isSelected: false },
      ],
    });
  });
});
