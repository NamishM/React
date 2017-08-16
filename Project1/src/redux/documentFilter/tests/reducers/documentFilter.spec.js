
import documentFilter, { getbuttonText } from '../../reducers/documentFilter';
import * as index from '../../reducers';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  isShowDeletedChecked: false,
  failedMessage: '',
  isFilterBoardVisible: false,
  buttonText: 'Filters',
};

describe('documentFilter reducer', () => {
  it('should handle initial state', () => {
    expect(
      documentFilter(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle DOCUMENT_FILTER_TOGGLE_VISIBLITY', () => {
    const state = {
      isFilterBoardVisible: false,
    };
    deepFreeze(state);

    expect(
      documentFilter(state, {
        type: types.DOCUMENT_FILTER_TOGGLE_VISIBLITY,
        isFilterBoardVisible: true,
      }),
    ).toEqual({
      isFilterBoardVisible: true,
    });
  });

  it('should handle FILTER_DOCUMENT_LIST', () => {
    const state = {
      isShowDeletedChecked: false,
      failedMessage: '',
      isFilterBoardVisible: true,
      buttonText: 'Filters',
    };
    deepFreeze(state);

    expect(
      documentFilter(state, {
        type: types.FILTER_DOCUMENT_LIST,
        isShowDeletedChecked: true,
      }),
    ).toEqual({
      isShowDeletedChecked: true,
      failedMessage: '',
      isFilterBoardVisible: false,
      buttonText: 'Filters',
    });
  });

  it('should handle DOCUMENT_FILTER_RESET_DEFAULT', () => {
    const state = {
      isShowDeletedChecked: true,
      failedMessage: '',
      isFilterBoardVisible: true,
      buttonText: 'Filters',
    };
    deepFreeze(state);

    expect(
      documentFilter(state, {
        type: types.DOCUMENT_FILTER_RESET_DEFAULT,
        isFilterBoardVisible: true,
        isDefaultLoaded: true,
      }),
    ).toEqual({
      isShowDeletedChecked: false,
      failedMessage: '',
      isFilterBoardVisible: false,
      buttonText: 'Filters',
    });
  });
  it('should handle LOGOUT_REQUESTED', () => {
    const state = {
      ...initialState,
    };
    expect(documentFilter(state, {
      type: 'LOGOUT_REQUESTED',
    })).toEqual({
      ...state,
    });
  });
  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    const state = {
      ...initialState,
    };
    expect(documentFilter(state, {
      type: 'LOGOUT_SESSION_REMOTE_ENDED',
    })).toEqual({
      ...state,
    });
  });
});

describe('documentFilter reducer getbuttonText', () => {
  it('should handle SHOW_DELETED = FALSE', () => {
    const showDeleted = false;
    expect(
      getbuttonText(showDeleted),
    ).toEqual('Filters');
  });
  it('should handle SHOW_DELETED = TRUE', () => {
    const showDeleted = true;
    expect(
      getbuttonText(showDeleted),
    ).toEqual('Filters: Show Deleted');
  });
});

describe('documentFilter index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ documentFilter });
  });
});
