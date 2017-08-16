import * as types from '../constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';

const initialState = {
  isShowDeletedChecked: false,
  failedMessage: '',
  isFilterBoardVisible: false,
  buttonText: 'Filters',
};

const documentFilter = (state = initialState, action) => {
  switch (action.type) {
    case types.DOCUMENT_FILTER_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: !state.isFilterBoardVisible,
      });
    }
    case types.FILTER_DOCUMENT_LIST:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: false,
        isShowDeletedChecked: action.isShowDeletedChecked,
      });
    }
    case types.DOCUMENT_FILTER_RESET_DEFAULT:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: false,
        isShowDeletedChecked: false,
      });
    }
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    default:
      return state;
  }
};

export const getbuttonText = (showDeleted) => {
  let buttonText = 'Filters';
  if (showDeleted) {
    buttonText = `${buttonText}: Show Deleted`;
  }
  return buttonText;
};

export default documentFilter;

