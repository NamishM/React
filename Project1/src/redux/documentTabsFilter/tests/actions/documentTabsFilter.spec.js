
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const drawers = [
  {
    drawerId: '32',
    drawerName: 'Chart Notes',
  },
  {
    drawerId: '11',
    drawerName: 'Nurse Notes',
  },
  {
    drawerId: '89',
    drawerName: 'Tests',
  },
];

describe('documentTabsFilter action', () => {
  it('getInitialDataRequested should create DOCUMENTTABS_FILTER_INITIAL_DATA_REQUESTED action', () => {
    expect(actions.getInitialDataRequested()).toEqual({
      type: types.DOCUMENTTABS_FILTER_INITIAL_DATA_REQUESTED,
    });
  });

  it('getDrawersSucceeded should create GET_DRAWERS_SUCCEDED action', () => {
    expect(actions.getDrawersSucceeded(drawers)).toEqual({
      type: types.GET_DRAWERS_SUCCEDED,
      drawers,
    });
  });

  it('getDrawersFailed should create GET_DRAWERS_FAILED action', () => {
    expect(actions.getDrawersFailed('Error')).toEqual({
      type: types.GET_DRAWERS_FAILED,
      message: 'Error',
    });
  });

  it('toggleVisiblity should create DOCUMENTTABS_FILTER_TOGGLE_VISIBLITY action', () => {
    expect(actions.toggleVisiblity(false)).toEqual({
      type: types.DOCUMENTTABS_FILTER_TOGGLE_VISIBLITY,
      isFilterBoardVisible: false,
    });
  });

  it('filterDocumentTabs should create FILTER_DOCUMENT_TABS action',
    () => {
      expect(actions.filterDocumentTabs(drawers, false)).toEqual({
        type: types.FILTER_DOCUMENT_TABS,
        selectedDrawers: drawers,
        ishasDocumentChecked: false,
      });
    });

  it('resetToDefault should create DOCUMENTTABS_FILTER_RESET_DEFAULT action', () => {
    expect(actions.resetToDefault()).toEqual({
      type: types.DOCUMENTTABS_FILTER_RESET_DEFAULT,
    });
  });

  it('resetGridsData should create RESET_DOCUMENTTABS_GRID action', () => {
    expect(actions.resetGridsData()).toEqual({
      type: types.RESET_DOCUMENTTABS_GRID,
    });
  });
});
