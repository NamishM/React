import * as types from '../constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';

const initialState = {
  drawers: [],
  failedMessage: '',
  isFilterBoardVisible: false,
  buttonText: 'Filters',
  ishasDocumentChecked: false,
};

const updateDrawerDetails = (state, action) => {
  switch (action.type) {
    case types.GET_DRAWERS_SUCCEDED:
      return {
        label: state.drawerName,
        value: state.drawerId,
        selected: true,
      };
    case types.FILTER_DOCUMENT_TABS:
    {
      let isSelected = false;
      const selectedDrawersList = Array.from(action.selectedDrawers);
      if (selectedDrawersList.filter(drawer => drawer.selected).length === 0) {
        return state;
      }
      for (const drawer of selectedDrawersList) {
        if (drawer.selected && drawer.value.toString() === state.value.toString()) {
          isSelected = true;
        }
      }
      return {
        ...state,
        selected: isSelected,
      };
    }
    default:
      return state;
  }
};

const documentTabsFilter = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DRAWERS_SUCCEDED:
    {
      return Object.assign({}, state, {
        drawers: action.drawers.map(drawer => updateDrawerDetails(drawer, action)),
      });
    }
    case types.GET_DRAWERS_FAILED:
    {
      return Object.assign({}, state, {
        failedMessage: action.message,
      });
    }
    case types.DOCUMENTTABS_FILTER_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: !state.isFilterBoardVisible,
      });
    }
    case types.FILTER_DOCUMENT_TABS:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: false,
        drawers: action.selectedDrawers ?
          state.drawers.map(drawer => updateDrawerDetails(drawer, action)) :
          state.drawers,
        ishasDocumentChecked: action.ishasDocumentChecked,
      });
    }
    case types.DOCUMENTTABS_FILTER_RESET_DEFAULT:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: false,
        drawers: [],
        ishasDocumentChecked: false,
      });
    }
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    default:
      return state;
  }
};

export const getFilterCriteria = (state) => {
  const selectedDrawers = state.documentTabsFilter.drawers.filter(drawer => drawer.selected);
  return {
    selectedDrawers: selectedDrawers.length === state.documentTabsFilter.drawers.length ?
      null : selectedDrawers,
    ishasDocumentChecked: state.documentTabsFilter.ishasDocumentChecked,
  };
};

export const getbuttonText = (drawers, ishasDocumentChecked) => {
  const selectedDrawers = drawers.filter(drawer => drawer.selected);
  let buttonText = 'Filters';
  if (selectedDrawers.length === 1) {
    buttonText = `${buttonText}: ${selectedDrawers[0].label}`;
  } else if (selectedDrawers.length > 1) {
    buttonText = `${buttonText}: Multiple Drawers`;
  }

  if (ishasDocumentChecked) {
    buttonText = `${buttonText}; Has Document`;
  }
  return buttonText;
};

export default documentTabsFilter;

