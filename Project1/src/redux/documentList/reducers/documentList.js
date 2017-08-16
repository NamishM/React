import * as types from '../constants/ActionTypes';
import { FILTER_DOCUMENT_LIST,
  DOCUMENT_FILTER_RESET_DEFAULT } from '../../documentFilter/constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';
import {
  RESET_DOCUMENTTABS_GRID,
  FILTER_DOCUMENT_TABS,
} from '../../documentTabsFilter/constants/ActionTypes';
import { BACK_TO_DOCUMENT_TABS,
  DOCUMENT_TAB_SELECTION } from '../../documentTabs/constants/ActionTypes';

const initialState = {
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

const documentList = (state = initialState, action) => {
  const scaleInterval = 0.2;

  switch (action.type) {
    case types.DOCUMENTS_FETCH_REQUESTED:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.page,
        },
        isInfiniteLoading: true,
      };
    case types.DOCUMENTS_FETCH_SUCCEEDED:
    {
      return {
        ...state,
        stats: {
          // TO DO: its a work around in case of no results next filter click was not working
          ...action.stats,
          totalPages: action.stats.totalPages === 0 ? 999 : action.stats.totalPages,
        },
        filters: {
          ...state.filters,
          page: action.stats.pageNumber,
        },
        isInfiniteLoading: false,
        results: [
          ...state.results,
          ...action.result.documentInfos,
        ],
        entities: {
          documentInfos: {
            ...state.entities.documentInfos,
            ...action.entities.documentInfos,
          },
        },
      };
    }
    case types.DOCUMENTS_FETCH_FAILED:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isInfiniteLoading: false,
      });
    case types.DOCUMENTS_NEXT_PAGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          // Limit to total available pages
          // paging starts from page == 1,
          // because appointment api gives result same for page = 0 and page = 1
          page: state.filters.page === 0 ||
            state.filters.page + 1 < state.stats.totalPages
            ? state.filters.page + 1 : state.stats.totalPages,
        },
      };
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    case DOCUMENT_FILTER_RESET_DEFAULT:
    case FILTER_DOCUMENT_LIST:
    case RESET_DOCUMENTTABS_GRID:
    case FILTER_DOCUMENT_TABS:
    case DOCUMENT_TAB_SELECTION:
    case BACK_TO_DOCUMENT_TABS:
    case 'SELECTED_CHART_CLEAR':
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
        results: [],
        entities: {
          documentInfos: {},
        },
        stats: {
          pageNumber: 0,
          pageSize: 0,
          startIndex: 0,
          endIndex: 0,
          totalPages: 999,
          totalResults: 0,
        },
        sort: state.sort,
        selectedDocumentId: null,
        document: {
          content: null,
          pageNumber: 0,
          scale: 1,
          pageCount: 0,
          rotation: 360,
        },
      };
    case types.DOCUMENTS_SORT_COLUMN:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
        results: [],
        entities: {
          documentInfos: {},
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
          ...state.sort,
          columns: state.sort.ids.reduce((prev, id) => {
            let newState = 'none';

            if (id === parseInt(action.sortedBy, 10)) {
              switch (state.sort.columns[id].state) {
                case 'none':
                  newState = 'asc';
                  break;
                case 'asc':
                  newState = 'desc';
                  break;
                case 'desc':
                default:
                  newState = 'none';
                  break;
              }
            }

            prev[id] = { // eslint-disable-line no-param-reassign
              ...state.sort.columns[id],
              state: newState,
            };

            return prev;
          }, {}),
        },
      };
    case types.SKIP_NEXT_DOCUMENTS_DATA:
      return Object.assign({}, state, {
        isInfiniteLoading: false,
      });
    case types.DOCUMENTCONTENT_FETCH_REQUESTED:
      return Object.assign({}, state, {
        selectedDocumentId: action.id,
        document: {
          content: null,
          pageNumber: 0,
          scale: 1,
          pageCount: 0,
          rotation: 360,
        },
      });
    case types.DOCUMENTCONTENT_FETCH_SUCCEEDED:
      return {
        ...state,
        document: {
          content: action.documentContent,
          pageNumber: 1,
          scale: 1,
          pageCount: 1,
          rotation: 360,
        },
      };
    case types.PDF_PREVIOUS_PAGE:
      return {
        ...state,
        document: {
          ...state.document,
          pageNumber: state.document.pageNumber - 1,
        },
      };
    case types.PDF_NEXT_PAGE:
      return {
        ...state,
        document: {
          ...state.document,
          pageNumber: state.document.pageNumber + 1,
        },
      };
    case types.PDF_ZOOM_IN:
      return {
        ...state,
        document: {
          ...state.document,
          scale: state.document.scale + scaleInterval,
        },
      };
    case types.PDF_ZOOM_OUT:
      return {
        ...state,
        document: {
          ...state.document,
          scale: state.document.scale - scaleInterval,
        },
      };
    case types.PDF_DOCUMENT_LOADED:
      return {
        ...state,
        document: {
          ...state.document,
          pageCount: action.pageCount,
        },
      };
    case types.PDF_ROTATE_LEFT:
      return {
        ...state,
        document: {
          ...state.document,
          rotation: state.document.rotation - 90 < 90 ? 360 : state.document.rotation - 90,
        },
      };
    case types.PDF_ROTATE_RIGHT:
      return {
        ...state,
        document: {
          ...state.document,
          rotation: state.document.rotation + 90 > 360 ? 90 : state.document.rotation + 90,
        },
      };
    default:
      return state;
  }
};

export default documentList;


export const getDenormalizedDocuments = (state) => {
  const {
    documentList: {
      results: ids = [],
      entities:
      {
        documentInfos = {},
      },
      selectedDocumentId,
    },
  } = state;

  return ids.map(id => ({
    name: documentInfos[id].documentName,
    id,
    documentTypeId: documentInfos[id].documentTypeId,
    documentSize: documentInfos[id].documentSize,
    encounterDate: documentInfos[id].encounterDate,
    isDeleted: documentInfos[id].isDeleted,
    isSelected: selectedDocumentId === id,
    isSealed: documentInfos[id].sealed === 'Y',
  }));
};

export const getSelectedDocument = (state) => {
  const {
    documentList: {
      entities:
      {
        documentInfos = {},
      },
      selectedDocumentId,
    },
  } = state;

  return documentInfos[selectedDocumentId];
};

export const getSortOrder = ({ documentList: { sort: { ids = [], columns = {} } } }) =>
  ids.map(id =>
    ({ id, ...columns[id] }));
