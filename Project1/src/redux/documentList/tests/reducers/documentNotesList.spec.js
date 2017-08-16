
import documentNotesList from '../../reducers/documentNotesList';
import documentList from '../../reducers/documentList';
import * as index from '../../reducers/index';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const state = {
  results: [],
  entities: {
    documentNotes: {},
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
        name: 'sent',
        label: 'Date',
        state: 'desc',
      },
      1: {
        name: 'priorityCode',
        label: 'Priority',
        state: 'none',
      },
    },
  },
  isNotesVisible: false,
};

describe('documentNotesList reducer', () => {
  it('should handle initial state', () => {
    expect(
      documentNotesList(undefined, {}),
    ).toEqual(state);
  });

  it('should handle DOCUMENTS_FETCH_REQUESTED', () => {
    expect(documentNotesList(state, {
      type: 'DOCUMENT_NOTES_VIEW',
    })).toEqual({
      ...state,
      isNotesVisible: true,
    });
  });

  it('should handle DOCUMENT_NOTES_FETCH_SUCCEEDED', () => {
    expect(documentNotesList(state, {
      type: 'DOCUMENT_NOTES_FETCH_SUCCEEDED',
      result: { documentNotes: [] },
      entities: { documentNotes: [] },
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
    });
  });

  it('should handle DOCUMENT_NOTES_FETCH_FAILED', () => {
    expect(documentNotesList(state, {
      type: 'DOCUMENT_NOTES_FETCH_FAILED',
      message: 'error in API response',
    })).toEqual({
      ...state,
      errorMessage: 'error in API response',
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'LOGOUT_REQUESTED',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'LOGOUT_SESSION_REMOTE_ENDED',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle DOCUMENT_FILTER_RESET_DEFAULT', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'DOCUMENT_FILTER_RESET_DEFAULT',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle FILTER_DOCUMENT_LIST', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'FILTER_DOCUMENT_LIST',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle RESET_DOCUMENTTABS_GRID', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'RESET_DOCUMENTTABS_GRID',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle FILTER_DOCUMENT_TABS', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'FILTER_DOCUMENT_TABS',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle DOCUMENT_TAB_SELECTION', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'DOCUMENT_TAB_SELECTION',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle BACK_TO_DOCUMENT_TABS', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'BACK_TO_DOCUMENT_TABS',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle SELECTED_CHART_CLEAR', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'SELECTED_CHART_CLEAR',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle DOCUMENTCONTENT_FETCH_REQUESTED', () => {
    expect(documentNotesList(
      {
        ...state,
        isNotesVisible: true,
        results: [],
        entities: {
          documentNotes: {},
        },
        stats: {
          pageNumber: 1,
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 12,
          totalResults: 120,
        },
      },
      {
        type: 'DOCUMENTCONTENT_FETCH_REQUESTED',
        id: 11,
      })).toEqual({
      ...state,
    });
  });

  it('should handle DOCUMENT_NOTES_SORT_COLUMN', () => {
    expect(documentNotesList(state, {
      type: 'DOCUMENT_NOTES_SORT_COLUMN',
      sortedBy: 1,
    })).toEqual({
      ...state,
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
            name: 'sent',
            label: 'Date',
            state: 'none',
          },
          1: {
            name: 'priorityCode',
            label: 'Priority',
            state: 'asc',
          },
        },
      },
    });
  });
});

describe('documentNotesList index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ documentList, documentNotesList });
  });
});
