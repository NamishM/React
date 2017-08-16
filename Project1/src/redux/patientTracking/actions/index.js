import * as types from '../constants/ActionTypes';

export const getPatientTrackingsData = (
  page,
  sortColumns,
  sortColumnPrecedence,
) => ({
  type: types.PATIENT_TRACKING_FETCH_REQUESTED,
  page,
  sortColumns,
  sortColumnPrecedence,
});

export const getPatientTrackingSucceeded = (result, entities, stats) => ({
  type: types.PATIENT_TRACKING_FETCH_SUCCEEDED,
  result,
  entities,
  stats,
});

export const getPatientTrackingFailed = (message = 'error in API response') => ({
  type: types.PATIENT_TRACKING_FETCH_FAILED,
  message,
});

export const sortColumn = sortedBy => ({
  type: types.PATIENT_TRACKING_SORT_COLUMN,
  sortedBy,
});

export const getNextPage = () => ({
  type: types.PATIENT_TRACKING_NEXT_PAGE,
});

export const skipPatientTrackingNextDataFlow = () => ({
  type: types.SKIP_NEXT_PATIENT_TRACKING_DATA,
});

export const onRefreshClick = () => ({
  type: types.REFRESH_PATIENT_TRACKING_DATA,
});
