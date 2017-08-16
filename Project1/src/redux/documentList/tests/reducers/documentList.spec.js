
import documentList from '../../reducers/documentList';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const state = {
  results: [],
  entities: {
    documentInfos: {},
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
        name: 'documentName',
        label: 'Name',
        state: 'none',
      },
      1: {
        name: 'encounterDate',
        label: 'Date',
        state: 'asc',
      },
    },
  },
  isInfiniteLoading: false,
  filters: {
    page: 0,
  },
  selectedDocumentId: null,
  document: {
    content: null,
    pageNumber: 1,
    scale: 1,
    pageCount: 1,
    rotation: 360,
  },
};

describe('documentList reducer', () => {
  it('should handle initial state', () => {
    expect(
      documentList(undefined, {}),
    ).toEqual(state);
  });

  it('should handle DOCUMENTS_FETCH_REQUESTED', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_FETCH_REQUESTED',
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

  it('should handle DOCUMENTS_FETCH_SUCCEEDED', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_FETCH_SUCCEEDED',
      result: { documentInfos: [] },
      entities: { documentInfos: [] },
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
  it('should handle DOCUMENTS_FETCH_SUCCEEDED', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_FETCH_SUCCEEDED',
      result: { documentInfos: [] },
      entities: { documentInfos: [] },
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

  it('should handle DOCUMENTS_FETCH_FAILED', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_FETCH_FAILED',
      message: 'error in API response',
    })).toEqual({
      ...state,
      errorMessage: 'error in API response',
      isInfiniteLoading: false,
    });
  });

  it('should handle DOCUMENTS_NEXT_PAGE', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_NEXT_PAGE',
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
    });
  });

  it('should handle DOCUMENTS_NEXT_PAGE', () => {
    expect(documentList({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
      stats: {
        ...state.stats,
        totalPages: 2,
      },
    },
    {
      type: 'DOCUMENTS_NEXT_PAGE',
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 2,
      },
      stats: {
        ...state.stats,
        totalPages: 2,
      },
    });
  });
  it('should handle DOCUMENTCONTENT_FETCH_REQUESTED', () => {
    expect(documentList(
      {
        ...state,
        selectedDocumentId: 10,
        document: {
          content: 'test',
          pageNumber: 1,
          scale: 1.2,
          pageCount: 1,
          rotation: 90,
        },
      },
      {
        type: 'DOCUMENTCONTENT_FETCH_REQUESTED',
        id: 11,
      })).toEqual({
      ...state,
      selectedDocumentId: 11,
      document: {
        content: null,
        pageNumber: 0,
        scale: 1,
        pageCount: 0,
        rotation: 360,
      },
    });
  });

  it('should handle BACK_TO_DOCUMENT_TABS', () => {
    expect(documentList(state, {
      type: 'BACK_TO_DOCUMENT_TABS',
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
      selectedDocumentId: null,
      document: {
        content: null,
        pageNumber: 0,
        scale: 1,
        pageCount: 0,
        rotation: 360,
      },
    });
  });

  it('should handle FILTER_DOCUMENT_LIST', () => {
    expect(documentList(state, {
      type: 'FILTER_DOCUMENT_LIST',
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
      selectedDocumentId: null,
      document: {
        content: null,
        pageNumber: 0,
        scale: 1,
        pageCount: 0,
        rotation: 360,
      },
    });
  });

  it('should handle DOCUMENTS_SORT_COLUMN', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_SORT_COLUMN',
      sortedBy: 1,
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
            name: 'documentName',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'encounterDate',
            label: 'Date',
            state: 'desc',
          },
        },
      },
    });
  });

  it('should handle DOCUMENTS_SORT_COLUMN by desc', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_SORT_COLUMN',
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
            name: 'documentName',
            label: 'Name',
            state: 'asc',
          },
          1: {
            name: 'encounterDate',
            label: 'Date',
            state: 'none',
          },
        },
      },
    });
  });
  it('should handle DOCUMENTS_SORT_COLUMN by none', () => {
    expect(documentList({
      ...state,
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'documentName',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'encounterDate',
            label: 'Date',
            state: 'desc',
          },
        },
      },
    }, {
      type: 'DOCUMENTS_SORT_COLUMN',
      sortedBy: 1,
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
            name: 'documentName',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'encounterDate',
            label: 'Date',
            state: 'none',
          },
        },
      },
    });
  });

  it('should handle DOCUMENTS_SORT_COLUMN by defaultState', () => {
    expect(documentList(state, {
      type: 'DOCUMENTS_SORT_COLUMN',
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
            name: 'documentName',
            label: 'Name',
            state: 'asc',
          },
          1: {
            name: 'encounterDate',
            label: 'Date',
            state: 'none',
          },
        },
      },
    });
  });
  it('should handle PDF_ROTATE_LEFT', () => {
    let newState = documentList(state, {
      type: 'PDF_ROTATE_LEFT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 270,
      },
    });

    newState = documentList(newState, {
      type: 'PDF_ROTATE_LEFT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 180,
      },
    });

    newState = documentList(newState, {
      type: 'PDF_ROTATE_LEFT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 90,
      },
    });

    newState = documentList(newState, {
      type: 'PDF_ROTATE_LEFT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 360,
      },
    });
  });

  it('should handle PDF_ROTATE_RIGHT', () => {
    let newState = documentList(state, {
      type: 'PDF_ROTATE_RIGHT',
    });

    expect(newState).toEqual({
      ...state,
      document: {
        ...state.document,
        rotation: 90,
      },
    });

    newState = documentList(newState, {
      type: 'PDF_ROTATE_RIGHT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 180,
      },
    });

    newState = documentList(newState, {
      type: 'PDF_ROTATE_RIGHT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 270,
      },
    });

    newState = documentList(newState, {
      type: 'PDF_ROTATE_RIGHT',
    });

    expect(newState).toEqual({
      ...newState,
      document: {
        ...newState.document,
        rotation: 360,
      },
    });
  });
  it('should handle LOGOUT_REQUESTED', () => {
    expect(documentList(state, {
      type: 'LOGOUT_REQUESTED',
    })).toEqual({
      ...state,
    });
  });
  it('should handle DOCUMENT_FILTER_RESET_DEFAULT', () => {
    const stateDesc = {
      document: {
        content: null,
        pageCount: 0,
        pageNumber: 0,
        rotation: 360,
        scale: 1,
      },
      doument: {
        content: null,
        pageCount: 0,
        pageNumber: 0,
        rotation: 360,
        scale: 1,
      },
      entities: {
        documentInfos: {},
      },
      filters: {
        page: 0,
      },
      results: [],
      selectedDocumentId: null,
      sort: undefined,
      stats: {
        endIndex: 0,
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
    };
    expect(documentList(stateDesc, {
      type: 'DOCUMENT_FILTER_RESET_DEFAULT',
    })).toEqual({
      ...stateDesc,
    });
  });
  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(documentList(state, {
      type: 'LOGOUT_SESSION_REMOTE_ENDED',
    })).toEqual({
      ...state,

    });
  });

  it('should handle SKIP_NEXT_DOCUMENTS_DATA', () => {
    expect(documentList(state, {
      type: 'SKIP_NEXT_DOCUMENTS_DATA',
    })).toEqual({
      ...state,
      isInfiniteLoading: false,
    });
  });

  it('should handle DOCUMENTCONTENT_FETCH_SUCCEEDED', () => {
    expect(documentList(state, {
      type: 'DOCUMENTCONTENT_FETCH_SUCCEEDED',
    })).toEqual({
      ...state,
      document: {
        content: undefined,
        pageNumber: 1,
        scale: 1,
        pageCount: 1,
        rotation: 360,
      },
    });
  });

  it('should handle PDF_PREVIOUS_PAGE', () => {
    expect(documentList(state, {
      type: 'PDF_PREVIOUS_PAGE',
    })).toEqual({
      ...state,
      document: {
        content: null,
        pageNumber: 0,
        scale: 1,
        pageCount: 1,
        rotation: 360,
      },
    });
  });

  it('should handle PDF_NEXT_PAGE', () => {
    expect(documentList(state, {
      type: 'PDF_NEXT_PAGE',
    })).toEqual({
      ...state,
      document: {
        content: null,
        pageNumber: 2,
        scale: 1,
        pageCount: 1,
        rotation: 360,
      },
    });
  });
  it('should handle PDF_ZOOM_IN', () => {
    expect(documentList(state, {
      type: 'PDF_ZOOM_IN',
    })).toEqual({
      ...state,
      document: {
        content: null,
        pageNumber: 1,
        scale: 1.2,
        pageCount: 1,
        rotation: 360,
      },
    });
  });
  it('should handle PDF_ZOOM_OUT', () => {
    expect(documentList(state, {
      type: 'PDF_ZOOM_OUT',
    })).toEqual({
      ...state,
      document: {
        content: null,
        pageNumber: 1,
        scale: 0.8,
        pageCount: 1,
        rotation: 360,
      },
    });
  });

  it('should handle PDF_DOCUMENT_LOADED', () => {
    expect(documentList(state, {
      type: 'PDF_DOCUMENT_LOADED',
    })).toEqual({
      ...state,
      document: {
        content: null,
        pageNumber: 1,
        scale: 1,
        pageCount: undefined,
        rotation: 360,
      },
    });
  });
});
