import * as types from '../constants/ActionTypes';

export const toggleVisiblity = isFilterBoardVisible => ({
  type: types.DOCUMENT_FILTER_TOGGLE_VISIBLITY,
  isFilterBoardVisible,
});

export const filterDocuments = isShowDeletedChecked => ({
  type: types.FILTER_DOCUMENT_LIST,
  isShowDeletedChecked,
});

export const resetToDefault = () => ({
  type: types.DOCUMENT_FILTER_RESET_DEFAULT,
});

export const resetGridsData = () => ({
  type: types.RESET_DOCUMENT_LIST,
});
