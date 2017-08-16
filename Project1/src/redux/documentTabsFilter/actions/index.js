import * as types from '../constants/ActionTypes';

export const getInitialDataRequested = () => ({
  type: types.DOCUMENTTABS_FILTER_INITIAL_DATA_REQUESTED,
});

export const getDrawersSucceeded = drawers => ({
  type: types.GET_DRAWERS_SUCCEDED,
  drawers,
});

export const getDrawersFailed = message => ({
  type: types.GET_DRAWERS_FAILED,
  message,
});

export const toggleVisiblity = isFilterBoardVisible => ({
  type: types.DOCUMENTTABS_FILTER_TOGGLE_VISIBLITY,
  isFilterBoardVisible,
});

export const filterDocumentTabs = (
  selectedDrawers,
  ishasDocumentChecked,
) => ({
  type: types.FILTER_DOCUMENT_TABS,
  selectedDrawers,
  ishasDocumentChecked,
});

export const resetToDefault = () => ({
  type: types.DOCUMENTTABS_FILTER_RESET_DEFAULT,
});

export const resetGridsData = () => ({
  type: types.RESET_DOCUMENTTABS_GRID,
});
