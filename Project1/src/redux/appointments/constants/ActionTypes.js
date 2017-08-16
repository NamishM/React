export const generateActionTypes = name => ({
  APPOINTMENT_VIEW: `${name}_VIEW`,
  APPOINTMENT_SELECTION: `${name}_SELECTION`,
  APPOINTMENT_FETCH_REQUESTED: `${name}_FETCH_REQUESTED`,
  APPOINTMENT_FETCH_SUCCEEDED: `${name}_FETCH_SUCCEEDED`,
  APPOINTMENT_FETCH_FAILED: `${name}_FETCH_FAILED`,
  APPOINTMENT_SORT_COLUMN: `${name}_SORT_COLUMN`,
  APPOINTMENT_SEARCH_VIEW: `${name}_SEARCH_VIEW`,
  APPOINTMENT_SET_FILTER: `${name}_SET_FILTER`,
  APPOINTMENT_NEXT_PAGE: `${name}_NEXT_PAGE`,
  APPOINTMENT_FETCH_FILTER_REQUESTED: `${name}_FETCH_FILTER_REQUESTED`,
  APPOINTMENT_CLEAR: `${name}_CLEAR`,
  SKIP_NEXT_APPOINTMENT_DATA: `${name}_SKIP_NEXT_APPOINTMENT_DATA`,
});
