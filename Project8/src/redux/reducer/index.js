import * as types from '../constants/ActionTypes';

const initialState = {
  errorMessage: '',
  employeeData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeeData: action.employeeData,
      };
    case types.EMPLOYEE_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
