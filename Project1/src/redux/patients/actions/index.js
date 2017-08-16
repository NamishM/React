import * as types from '../constants/ActionTypes';

export const onChangeSearchView = searchCriteria => ({
  type: types.ADVANCE_SEARCH_TOGGLE,
  searchCriteria,
});

export const onSearchClicked = (searchCriteria, page) => ({
  type: types.SEARCH_INIT,
  searchCriteria,
  page,
});

export const onSearchSucceeded = (result, entities, stats) => ({
  type: types.SEARCH_SUCCEEDED,
  result,
  entities,
  stats,
});

export const onSearchFailed = (message = 'error in API response') => ({
  type: types.SEARCH_FAILED,
  message,
});

export const onClearClicked = () => ({
  type: types.CLEAR_FIELDS,
});

export const onFocusDate = isDate => ({
  type: types.DATE_VIEW_CHANGE,
  isDate,
});

export const onSelection = (id = -1) => ({
  type: types.PATIENT_SELECTION,
  id,
});

export const sortColumn = sortedBy => ({
  type: types.SORT_COLUMN,
  sortedBy,
});

export const getLatestEncounterSucceeded = encounter => ({
  type: types.LATEST_ENCOUNTER_FETCH_SUCCEEDED,
  encounter,
});

export const getLatestEncounterFailed = (message = 'error in API response') => ({
  type: types.LATEST_ENCOUNTER_FETCH_FAILED,
  message,
});

export const getNextPatientData = () => ({
  type: types.GET_NEXT_PATIENT_DATA,
});

export const skipPatientNextDataFlow = () => ({
  type: types.SKIP_NEXT_PATIENT_DATA,
});

export const lastPageArrived = () => ({
  type: types.LAST_PAGE_ARRIVED,
});
