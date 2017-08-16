import * as types from '../constants/ActionTypes';

export const getDocumentTabsList = (
  page,
  sortColumns,
  sortColumnPrecedence,
) => ({
  type: types.DOCUMENT_TABS_FETCH_REQUESTED,
  page,
  sortColumns,
  sortColumnPrecedence,
});

export const getDocumentTabsListSucceeded = (result, entities, stats) => ({
  type: types.DOCUMENT_TABS_FETCH_SUCCEEDED,
  result,
  entities,
  stats,
});

export const getDocumentTabsListFailed = (message = 'error in API response') => ({
  type: types.DOCUMENT_TABS_FETCH_FAILED,
  message,
});

export const sortColumn = sortedBy => ({
  type: types.DOCUMENT_TABS_SORT_COLUMN,
  sortedBy,
});

export const getNextPage = () => ({
  type: types.DOCUMENT_TABS_NEXT_PAGE,
});

export const skipDocumentTabsListNextDataFlow = () => ({
  type: types.SKIP_NEXT_DOCUMENT_TABS_DATA,
});

export const onSelection = (id = -1) => ({
  type: types.DOCUMENT_TAB_SELECTION,
  id,
});

export const backToTabs = () => ({
  type: types.BACK_TO_DOCUMENT_TABS,
});
