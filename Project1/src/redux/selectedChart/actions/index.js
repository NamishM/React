import * as types from '../constants/ActionTypes';

export const clearSelectedChart = () => ({
  type: types.SELECTED_CHART_CLEAR,
});

export const setPreviousRoute = (pathname, search) => ({
  type: types.SELECTED_CHART_SET_PREV_ROUTE,
  pathname,
  search,
});

export const chartSelected = personId => ({
  type: types.SELECTED_CHART_SELECTED,
  personId,
});

export const encounterSelected = (personId, encounterId) => ({
  type: types.SELECTED_CHART_ENCOUNTER_SELECTED,
  personId,
  encounterId,
});

export const setChart = chart => ({
  type: types.SELECTED_CHART_SET_CHART,
  chart,
});

export const setEncounter = encounter => ({
  type: types.SELECTED_CHART_SET_ENCOUNTER,
  encounter,
});
