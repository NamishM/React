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

const documentNotesList = (state = initialState, action) => {
  switch (action.type) {
    case types.DOCUMENT_NOTES_VIEW:
      return {
        ...state,
        isNotesVisible: !state.isNotesVisible,
      };
    case types.DOCUMENT_NOTES_FETCH_SUCCEEDED:
    {
      return {
        ...state,
        stats: {
          ...action.stats,
        },
        results: [
          ...state.results,
          ...action.result.documentNotes,
        ],
        entities: {
          documentNotes: {
            ...state.entities.documentNotes,
            ...action.entities.documentNotes,
          },
        },
      };
    }
    case types.DOCUMENT_NOTES_FETCH_FAILED:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
    case DOCUMENT_FILTER_RESET_DEFAULT:
    case FILTER_DOCUMENT_LIST:
    case RESET_DOCUMENTTABS_GRID:
    case FILTER_DOCUMENT_TABS:
    case DOCUMENT_TAB_SELECTION:
    case BACK_TO_DOCUMENT_TABS:
    case 'SELECTED_CHART_CLEAR':
    case types.DOCUMENTCONTENT_FETCH_REQUESTED:
      return initialState;
    case types.DOCUMENT_NOTES_SORT_COLUMN:
      return {
        ...state,
        results: [],
        entities: {
          documentNotes: {},
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
    default:
      return state;
  }
};

export default documentNotesList;


export const getDenormalizedNotes = (state) => {
  const {
    documentNotesList: {
      results: msgIds = [],
      entities:
      {
        documentNotes = {},
      },
    },
  } = state;

  return msgIds.map(id => ({
    subject: documentNotes[id].subject,
    id,
    message: documentNotes[id].message,
    priorityCode: documentNotes[id].priorityCode,
    sent: documentNotes[id].sent,
    regardingPatient: documentNotes[id].regardingPatient,
    sender: `${documentNotes[id].senderFirstName}, ${documentNotes[id].senderLastName}`,
  }));
};

export const getSortOrder = ({ documentNotesList: { sort: { ids = [], columns = {} } } }) =>
  ids.map(id =>
    ({ id, ...columns[id] }));
