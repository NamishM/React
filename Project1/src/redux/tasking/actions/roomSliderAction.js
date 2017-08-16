import * as types from '../constants/ActionTypes';

export const loadPatients = () => ({
  type: types.PATIENTS_LOAD,
});

export const patientToggleSelected = patientId => ({
  type: types.PATIENT_TOGGLE_SELECTED,
  patientId,
});
