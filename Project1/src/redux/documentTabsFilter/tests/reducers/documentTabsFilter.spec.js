
import documentTabsFilter,
{ getbuttonText, getFilterCriteria } from '../../reducers/documentTabsFilter';
import * as types from '../../constants/ActionTypes';
import * as index from '../../reducers';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  drawers: [],
  failedMessage: '',
  isFilterBoardVisible: false,
  buttonText: 'Filters',
  ishasDocumentChecked: false,
};

const drawersObj = [
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

describe('documentTabsFilter reducer', () => {
  it('should handle initial state', () => {
    expect(
      documentTabsFilter(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle GET_DRAWERS_SUCCEDED', () => {
    const state = {
      drawers: [],
    };
    deepFreeze(state);

    expect(
      documentTabsFilter(state, {
        type: types.GET_DRAWERS_SUCCEDED,
        drawers: drawersObj,
      }),
    ).toEqual({
      drawers:
      [
        {
          value: '32',
          label: 'Chart Notes',
          selected: true,
        },
        {
          value: '11',
          label: 'Nurse Notes',
          selected: true,
        },
        {
          value: '89',
          label: 'Tests',
          selected: true,
        },
      ],
    });
  });

  it('should handle GET_DRAWERS_FAILED', () => {
    const state = {
      drawers: [],
    };
    deepFreeze(state);

    expect(
      documentTabsFilter(state, {
        type: types.GET_DRAWERS_FAILED,
        message: 'hello',
      }),
    ).toEqual({
      drawers: [],
      failedMessage: 'hello',
    });
  });

  it('should handle DOCUMENTTABS_FILTER_TOGGLE_VISIBLITY', () => {
    const state = {
      isFilterBoardVisible: false,
    };
    deepFreeze(state);

    expect(
      documentTabsFilter(state, {
        type: types.DOCUMENTTABS_FILTER_TOGGLE_VISIBLITY,
        isFilterBoardVisible: true,
      }),
    ).toEqual({
      isFilterBoardVisible: true,
    });
  });

  it('should handle FILTER_DOCUMENT_TABS', () => {
    const state = {
      drawers: [],
      failedMessage: '',
      isFilterBoardVisible: true,
      buttonText: 'Filters',
      ishasDocumentChecked: false,
    };
    deepFreeze(state);
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: false,
      },
      {
        value: '89',
        label: 'Tests',
        selected: false,
      },
    ];
    expect(
      documentTabsFilter({ ...state, drawers }, {
        type: types.FILTER_DOCUMENT_TABS,
        selectedDrawers: drawers,
        ishasDocumentChecked: true,
      }),
    ).toEqual({
      drawers,
      failedMessage: '',
      isFilterBoardVisible: false,
      buttonText: 'Filters',
      ishasDocumentChecked: true,
    });
  });
  it('should handle FILTER_DOCUMENT_TABS', () => {
    const state = {
      drawers: [],
      failedMessage: '',
      isFilterBoardVisible: true,
      buttonText: 'Filters',
      ishasDocumentChecked: false,
    };
    deepFreeze(state);
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: false,
      },
      {
        value: '89',
        label: 'Tests',
        selected: false,
      },
    ];
    expect(
      documentTabsFilter({ ...state, drawers }, {
        type: types.FILTER_DOCUMENT_TABS,
        ishasDocumentChecked: true,
      }),
    ).toEqual({
      drawers,
      failedMessage: '',
      isFilterBoardVisible: false,
      buttonText: 'Filters',
      ishasDocumentChecked: true,
    });
  });
  it('should handle FILTER_DOCUMENT_TABS', () => {
    const state = {
      drawers: [],
      failedMessage: '',
      isFilterBoardVisible: true,
      buttonText: 'Filters',
      ishasDocumentChecked: false,
    };
    deepFreeze(state);
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: false,
      },
      {
        value: '89',
        label: 'Tests',
        selected: false,
      },
    ];
    expect(
      documentTabsFilter({ ...state, drawers }, {
        type: types.FILTER_DOCUMENT_TABS,
        selectedDrawers: [],
        ishasDocumentChecked: true,
      }),
    ).toEqual({
      drawers,
      failedMessage: '',
      isFilterBoardVisible: false,
      buttonText: 'Filters',
      ishasDocumentChecked: true,
    });
  });
  it('should handle DOCUMENTTABS_FILTER_RESET_DEFAULT', () => {
    const state = {
      drawers: [],
      failedMessage: '',
      isFilterBoardVisible: true,
      buttonText: 'Filters',
      ishasDocumentChecked: false,
    };
    deepFreeze(state);

    expect(
      documentTabsFilter(state, {
        type: types.DOCUMENTTABS_FILTER_RESET_DEFAULT,
      }),
    ).toEqual({
      drawers: [],
      failedMessage: '',
      isFilterBoardVisible: false,
      buttonText: 'Filters',
      ishasDocumentChecked: false,
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    expect(
      documentTabsFilter(initialState, {
        type: 'LOGOUT_REQUESTED',
      }),
    ).toEqual(initialState);
  });
  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(
      documentTabsFilter(initialState, {
        type: 'LOGOUT_SESSION_REMOTE_ENDED',
      }),
    ).toEqual(initialState);
  });
  it('should handle default', () => {
    expect(
      documentTabsFilter(initialState, {
        type: 'XYZ',
      }),
    ).toEqual(initialState);
  });
});

describe('documentTabsFilter reducer getbuttonText', () => {
  it('should handle ishasDocumentChecked = FALSE', () => {
    const ishasDocumentChecked = false;
    expect(
      getbuttonText([], ishasDocumentChecked),
    ).toEqual('Filters');
  });
  it('should handle ishasDocumentChecked = TRUE', () => {
    const ishasDocumentChecked = true;
    expect(
      getbuttonText([], ishasDocumentChecked),
    ).toEqual('Filters; Has Document');
  });
  it('should handle selectedDrawers.length === 1', () => {
    const ishasDocumentChecked = false;
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: false,
      },
      {
        value: '89',
        label: 'Tests',
        selected: false,
      },
    ];
    expect(
      getbuttonText(drawers, ishasDocumentChecked),
    ).toEqual('Filters: Chart Notes');
  });
  it('should handle selectedDrawers.length > 1', () => {
    const ishasDocumentChecked = false;
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: true,
      },
      {
        value: '89',
        label: 'Tests',
        selected: true,
      },
    ];
    expect(
      getbuttonText(drawers, ishasDocumentChecked),
    ).toEqual('Filters: Multiple Drawers');
  });
});

describe('documentTabsFilter reducer getFilterCriteria', () => {
  it('should handle selectedDrawers not all selected', () => {
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: false,
      },
      {
        value: '89',
        label: 'Tests',
        selected: false,
      },
    ];
    expect(
      getFilterCriteria({ documentTabsFilter: { ...initialState, drawers } }),
    ).toEqual({
      selectedDrawers: [{
        value: '32',
        label: 'Chart Notes',
        selected: true,
      }],
      ishasDocumentChecked: false,
    });
  });
  it('should handle selectedDrawers all selected', () => {
    const drawers = [
      {
        value: '32',
        label: 'Chart Notes',
        selected: true,
      },
      {
        value: '11',
        label: 'Nurse Notes',
        selected: true,
      },
      {
        value: '89',
        label: 'Tests',
        selected: true,
      },
    ];
    expect(
      getFilterCriteria({ documentTabsFilter: { ...initialState, drawers } }),
    ).toEqual({
      selectedDrawers: null,
      ishasDocumentChecked: false,
    });
  });
});

describe('documentTabsFilter index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ documentTabsFilter });
  });
});
