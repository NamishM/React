import * as types from '../constants/ActionTypes';

export const EmployeeSuccess = () => ({
  type: types.EMPLOYEE_SUCCESS,
});

export const EmployeeFailed = () => ({
  type: types.EMPLOYEE_FAILED,
});

export const onNewEmployeeCreation = options => ({
  type: types.ON_EMP_CREATION,
  options,
});

export const onEmployeeDeletion = id => ({
  type: types.ON_EMP_DELETION,
  id,
});
