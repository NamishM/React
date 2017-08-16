import * as types from '../constants/ActionTypes';
import { RESET_DOCUMENTTABS_GRID,
  FILTER_DOCUMENT_TABS } from '../../documentTabsFilter/constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';

const initialState = {
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

const documentTabs = (state = initialState, action) => {
  switch (action.type) {
    case types.DOCUMENT_TABS_FETCH_REQUESTED:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.page,
        },
        isInfiniteLoading: true,
      };
    case types.DOCUMENT_TABS_FETCH_SUCCEEDED:
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
          ...action.result.documentTabsInfos,
        ],
        entities: {
          documentTabsInfos: {
            ...state.entities.documentTabsInfos,
            ...action.entities.documentTabsInfos,
          },
        },
      };
    }
    case types.DOCUMENT_TABS_FETCH_FAILED:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isInfiniteLoading: false,
      });
    case types.DOCUMENT_TABS_NEXT_PAGE:
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
    case RESET_DOCUMENTTABS_GRID:
    case FILTER_DOCUMENT_TABS:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
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
        sort: state.sort,
        selectedTabId: null,
      };
    case 'SELECTED_CHART_SET_CHART':
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
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
        sort: state.sort,
      };
    case types.DOCUMENT_TABS_SORT_COLUMN:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
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
    case types.SKIP_NEXT_DOCUMENT_TABS_DATA:
      return Object.assign({}, state, {
        isInfiniteLoading: false,
      });
    case types.DOCUMENT_TAB_SELECTION:
      return Object.assign({}, state, {
        selectedTabId: action.id,
      });
    case types.BACK_TO_DOCUMENT_TABS:
      return Object.assign({}, state, {
        selectedTabId: null,
      });
    default:
      return state;
  }
};

export default documentTabs;


export const getDenormalizedDocumentTabs = (state) => {
  const {
    documentTabs: {
      results: ids = [],
      entities:
      {
        documentTabsInfos = {},
      },
      selectedTabId,
    },
  } = state;

  return ids.map(id => ({
    name: documentTabsInfos[id].documentGroupDesc,
    hasFiles: documentTabsInfos[id].hasFiles,
    id,
    isSelected: selectedTabId === id,
  }));
};

export const getSelectedTab = (state) => {
  const {
    documentTabs: {
      entities:
      {
        documentTabsInfos = {},
      },
      selectedTabId,
    },
  } = state;

  return documentTabsInfos[selectedTabId];
};

export const getDocumentSelection = ({
  documentTabs: {
    selectedTabId,
  },
  documentTabsFilter: {
    drawers,
  },
  documentList: {
    selectedDocumentId,
  },
}) => ({
  selectedTabId,
  selectedDocumentId,
  drawers,
});

export const getSortOrder = ({ documentTabs: { sort: { ids = [], columns = {} } } }) =>
  ids.map(id =>
    ({ id, ...columns[id] }));
