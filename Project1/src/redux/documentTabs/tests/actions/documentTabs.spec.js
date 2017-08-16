
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('documentTabs action', () => {
  it('getDocumentTabsList should create DOCUMENT_TABS_FETCH_REQUESTED', () => {
    expect(actions.getDocumentTabsList(1, {}, {})).toEqual({
      type: types.DOCUMENT_TABS_FETCH_REQUESTED,
      page: 1,
      sortColumns: {},
      sortColumnPrecedence: {},
    });
  });

  it('getDocumentTabsListSucceeded should create DOCUMENT_TABS_FETCH_SUCCEEDED', () => {
    expect(actions.getDocumentTabsListSucceeded([], [], {})).toEqual({
      type: types.DOCUMENT_TABS_FETCH_SUCCEEDED,
      result: [],
      entities: [],
      stats: {},
    });
  });

  it('getDocumentTabsListFailed should create DOCUMENT_TABS_FETCH_FAILED', () => {
    expect(actions.getDocumentTabsListFailed('error in API response')).toEqual({
      type: types.DOCUMENT_TABS_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('sortColumn should create DOCUMENT_TABS_SORT_COLUMN', () => {
    expect(actions.sortColumn(1)).toEqual({
      type: types.DOCUMENT_TABS_SORT_COLUMN,
      sortedBy: 1,
    });
  });

  it('getNextPage should create DOCUMENT_TABS_NEXT_PAGE', () => {
    expect(actions.getNextPage()).toEqual({
      type: types.DOCUMENT_TABS_NEXT_PAGE,
    });
  });

  it('skipDocumentTabsListNextDataFlow should create SKIP_NEXT_DOCUMENT_TABS_DATA', () => {
    expect(actions.skipDocumentTabsListNextDataFlow()).toEqual({
      type: types.SKIP_NEXT_DOCUMENT_TABS_DATA,
    });
  });

  it('onSelection should create DOCUMENT_TAB_SELECTION', () => {
    expect(actions.onSelection(14)).toEqual({
      type: types.DOCUMENT_TAB_SELECTION,
      id: 14,
    });
  });

  it('backToTabs should create BACK_TO_DOCUMENT_TABS', () => {
    expect(actions.backToTabs()).toEqual({
      type: types.BACK_TO_DOCUMENT_TABS,
    });
  });
});
