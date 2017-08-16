import * as types from '../constants/ActionTypes';

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

const updateRegistrationDetails = (state, action) => {
  switch (action.type) {
    case types.APP_REGISTRATION_ENDPOINT_SELECTED:
    {
      if (state.name === action.endpoint.name) {
        return {
          ...state,
          isSelected: true,
        };
      }
      return {
        ...state,
      };
    }
    case types.APP_REGISTRATION_ENDPOINT_UNSELECTED:
    {
      if (state.name === action.endpoint.name) {
        return {
          ...state,
          isSelected: false,
        };
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

const appRegistration = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_REGISTRATION_REGISTERED:
      return Object.assign({}, state, {
        appName: action.appName,
        registrationGuid: '10F26E88-6F04-41A4-8411-E718E0B9C448',
        isRegistered: true,
      });
    case types.APP_REGISTRATION_UNREGISTERED:
      return Object.assign({}, state, {
        registrationGuid: null,
        isRegistered: false,
        // endpoints: initialState.endpoints.slice(),
      });
    case types.APP_REGISTRATION_ENDPOINT_SELECTED:
      return Object.assign({}, state, {
        endpoints: state.endpoints.map(ep => updateRegistrationDetails(ep, action)),
      });
    case types.APP_REGISTRATION_ENDPOINT_UNSELECTED:
      return Object.assign({}, state, {
        endpoints: state.endpoints.map(ep => updateRegistrationDetails(ep, action)),
      });
    default:
      return state;
  }
};

export { appRegistration };
