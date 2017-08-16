
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('documentFilter action', () => {
  it('toggleVisiblity should create DOCUMENT_FILTER_TOGGLE_VISIBLITY action', () => {
    expect(actions.toggleVisiblity(false)).toEqual({
      type: types.DOCUMENT_FILTER_TOGGLE_VISIBLITY,
      isFilterBoardVisible: false,
    });
  });

  it('filterDocuments should create FILTER_DOCUMENT_LIST action', () => {
    expect(actions.filterDocuments(true)).toEqual({
      type: types.FILTER_DOCUMENT_LIST,
      isShowDeletedChecked: true,
    });
  });

  it('resetToDefault should create DOCUMENT_FILTER_RESET_DEFAULT action', () => {
    expect(actions.resetToDefault()).toEqual({
      type: types.DOCUMENT_FILTER_RESET_DEFAULT,
    });
  });

  it('resetGridsData should create RESET_DOCUMENT_LIST action', () => {
    expect(actions.resetGridsData()).toEqual({
      type: types.RESET_DOCUMENT_LIST,
    });
  });
});
