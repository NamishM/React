
import documentTabs from '../../reducers/documentTabs';
// import { getDenormalizedDocumentTabs } from '../../reducers/documentTabs';
import deepFreeze from 'deep-freeze';
import * as types from '../../constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../../user/constants/ActionTypes';
import * as index from '../../reducers/index';
import { RESET_DOCUMENTTABS_GRID, FILTER_DOCUMENT_TABS } from '../../../documentTabsFilter/constants/ActionTypes';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const state = {
  results: [],
  entities: {
    documentTabsInfos: {},
  },
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },
  sort: {
    ids: [0, 1],
    precedence: [0, 1],
    columns: {
      0: {
        name: 'documentGroupDesc',
        label: 'Name',
        state: 'none',
      },
      1: {
        name: 'sortSeq',
        label: '',
        state: 'asc',
      },
    },
  },
  isInfiniteLoading: false,
  filters: {
    page: 0,
  },
  selectedTabId: null,
};

const initialstate = {
  results: [],
  entities: {
    documentTabsInfos: {},
  },
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 999,
    totalResults: 0,
  },
  sort: {
    ids: [0, 1],
    precedence: [0, 1],
    columns: {
      0: {
        name: 'documentGroupDesc',
        label: 'Name',
        state: 'none',
      },
      1: {
        name: 'sortSeq',
        label: '',
        state: 'asc',
      },
    },
  },
  isInfiniteLoading: false,
  filters: {
    page: 0,
  },
  selectedTabId: null,
};

describe('documentTabs reducer', () => {
  it('should handle initial state', () => {
    expect(
      documentTabs(undefined, {}),
    ).toEqual(state);
  });

  it('should handle DOCUMENT_TABS_FETCH_REQUESTED', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TABS_FETCH_REQUESTED,
      page: 1,
      sortColumns: {},
      sortColumnPrecedence: {},
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: true,
    });
  });

  it('should handle DOCUMENT_TABS_FETCH_SUCCEEDED', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TABS_FETCH_SUCCEEDED,
      result: { documentTabsInfos: [] },
      entities: { documentTabsInfos: [] },
      stats: {
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 12,
        totalResults: 120,
      },
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 12,
        totalResults: 120,
      },
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: false,
    });
  });

  it('should handle DOCUMENT_TABS_FETCH_SUCCEEDED - when totalpages === 0', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TABS_FETCH_SUCCEEDED,
      result: { documentTabsInfos: [] },
      entities: { documentTabsInfos: [] },
      stats: {
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 0,
        totalResults: 120,
      },
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 999,
        totalResults: 120,
      },
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: false,
    });
  });

  it('should handle DOCUMENT_TABS_FETCH_FAILED', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TABS_FETCH_FAILED,
      message: 'error in API response',
    })).toEqual({
      ...state,
      errorMessage: 'error in API response',
      isInfiniteLoading: false,
    });
  });

  it('should handle DOCUMENT_TABS_NEXT_PAGE', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TABS_NEXT_PAGE,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
    });
  });

  it('should handle DOCUMENT_TABS_NEXT_PAGE - when page + 1 < totalPages', () => {
    const stateDesc = {
      results: [],
      entities: {
        documentTabsInfos: {},
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 3,
        totalResults: 0,
      },
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'asc',
          },
        },
      },
      isInfiniteLoading: false,
      filters: {
        page: 1,
      },
      selectedTabId: null,
    };
    deepFreeze(stateDesc);

    expect(documentTabs(stateDesc, {
      type: types.DOCUMENT_TABS_NEXT_PAGE,
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        totalPages: 3,
      },
      filters: {
        ...state.filters,
        page: 2,
      },
    });
  });

  it('should handle DOCUMENT_TABS_NEXT_PAGE - when page === 1 and page + 1 > totalPages', () => {
    const stateDesc = {
      results: [],
      entities: {
        documentTabsInfos: {},
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 2,
        totalResults: 0,
      },
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'asc',
          },
        },
      },
      isInfiniteLoading: false,
      filters: {
        page: 1,
      },
      selectedTabId: null,
    };
    deepFreeze(stateDesc);

    expect(documentTabs(stateDesc, {
      type: types.DOCUMENT_TABS_NEXT_PAGE,
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        totalPages: 2,
      },
      filters: {
        ...state.filters,
        page: 2,
      },
    });
  });

  it('should handle DOCUMENT_TAB_SELECTION', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TAB_SELECTION,
      id: 11,
    })).toEqual({
      ...state,
      selectedTabId: 11,
    });
  });

  it('should handle BACK_TO_DOCUMENT_TABS', () => {
    expect(documentTabs(state, {
      type: types.BACK_TO_DOCUMENT_TABS,
    })).toEqual({
      ...state,
      selectedTabId: null,
    });
  });

  it('should handle FILTER_DOCUMENT_TABS', () => {
    expect(documentTabs(state, {
      type: types.FILTER_DOCUMENT_TABS,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 0,
        totalResults: 0,
      },
      selectedTabId: null,
    });
  });

  it('should handle RESET_DOCUMENTTABS_GRID', () => {
    expect(documentTabs(state, {
      type: types.RESET_DOCUMENTTABS_GRID,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 0,
        totalResults: 0,
      },
      selectedTabId: null,
    });
  });

  it('should handle DOCUMENT_TABS_SORT_COLUMN - sortedBy: none to asc', () => {
    expect(documentTabs(state, {
      type: types.DOCUMENT_TABS_SORT_COLUMN,
      sortedBy: 0,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'asc',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'none',
          },
        },
      },
    });
  });

  it('should handle DOCUMENT_TABS_SORT_COLUMN - sortedBy: asc to desc', () => {
    expect(documentTabs({
      ...state,
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'asc',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'none',
          },
        },
      },
    }, {
      type: types.DOCUMENT_TABS_SORT_COLUMN,
      sortedBy: 0,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'desc',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'none',
          },
        },
      },
    });
  });

  it('should handle DOCUMENT_TABS_SORT_COLUMN - sortedBy: desc to none', () => {
    expect(documentTabs({
      ...state,
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'desc',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'none',
          },
        },
      },
    }, {
      type: types.DOCUMENT_TABS_SORT_COLUMN,
      sortedBy: 0,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentGroupDesc',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'sortSeq',
            label: '',
            state: 'none',
          },
        },
      },
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    expect(documentTabs(state, {
      type: LOGOUT_REQUESTED,
    })).toEqual(state);
  });

  it('should handle RESET_DOCUMENTTABS_GRID', () => {
    expect(documentTabs(state, {
      type: RESET_DOCUMENTTABS_GRID,
    })).toEqual(initialstate);
  });

  it('should handle FILTER_DOCUMENT_TABS', () => {
    expect(documentTabs(state, {
      type: FILTER_DOCUMENT_TABS,
      selectedDrawers: true,
      ishasDocumentChecked: true,
    })).toEqual(initialstate);
  });

  it('should handle SELECTED_CHART_SET_CHART', () => {
    expect(documentTabs(state, {
      type: 'SELECTED_CHART_SET_CHART',
      selectedDrawers: true,
      ishasDocumentChecked: true,
    })).toEqual(initialstate);
  });

  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(documentTabs(state, {
      type: LOGOUT_SESSION_REMOTE_ENDED,
    })).toEqual(state);
  });

  it('should handle SKIP_NEXT_DOCUMENT_TABS_DATA', () => {
    expect(documentTabs(state, {
      type: types.SKIP_NEXT_DOCUMENT_TABS_DATA,
    })).toEqual(state,
      {
        isInfiniteLoading: false,
      });
  });
});

describe('documentTabs index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ documentTabs });
  });
});

// describe('getDenormalizedDocumentTabs Function', () => {
//  it('should handle create getDenormalizedDocumentTabs Funtion', () => {
//    const state1 = {
//      ...state,
//      results: [
//        0:1,
//      ],
//      entities:
//      {
//        documentTabsInfos: {
//          1: {
//              documentGroupId: 1,
//                documentGroupDesc: "Chart Notes",
//                isDeleted: false,
//                sortSeq: 77,
//                isHidden: false,
//                msgAutoSeal: 1,
//                ocrEnabled: 0,
//                documentGroupNotes: null,
//                powerLink: false,
//                documents: true,
//                plugInLink: false,
//                isResultTab: false,
//                isDefaultResultTab: false,
//                hasFiles: true,
//            },
//        },
//      },
//      selectedTabId: 1,
//    };
//    expect(getDenormalizedDocumentTabs(state1)).toEqual(documentTabs: []);
//  });
// });
