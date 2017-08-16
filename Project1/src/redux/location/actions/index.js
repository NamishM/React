import { push } from 'react-router-redux';
import { reduceObjectsToString, singleLineString } from '../../../utilities';
import {
  LOCATION_SET_FULL_SCREEN_MODE,
  LOCATION_CHANGE_FULLSCREEN,
} from '../constants/ActionTypes';

export const updateFilter = ({
  currentPath,
  selectedDate,
  selectedPatientStatusTypes,
  selectedRooms,
  selectedLocations,
  selectedProviders,
  isFullScreenMode,
}) => {
  let action = null;
  // ---------------------------------------------------------------------------
  // TODO: REMOVE IF POSSIBLE
  // ---------------------------------------------------------------------------
  // This is another IE WebBrowser control anomaly.
  // Sometimes (inconsistently), the browser control seems to choke on the
  // history API methods.
  // We were unable to create a reproducible fix (the browser would literally
  // start working on random intervals, leading us to believe that we had somehow
  // solved the issue).
  // This fork bypasses the pushState API with a custom action that mirrors the
  // LOCATION_CHANGE event. It is currently an incomplete mirror of the API and
  // subject to issues if the true LOCATION_CHANGE action is updated in future
  // react-redux-router versions or if other code becomes dependent on other
  // properties not implemented in this custom action.
  // ---------------------------------------------------------------------------
  if (isFullScreenMode) {
    action = {
      type: LOCATION_CHANGE_FULLSCREEN,
      payload: {
        pathname: currentPath,
        query: {
          encounterDate: selectedDate,
          statusId: reduceObjectsToString(Array.from(selectedPatientStatusTypes).filter(item => item.selected), 'value'),
          roomId: reduceObjectsToString(Array.from(selectedRooms).filter(item => item.selected), 'value'),
          locationId: reduceObjectsToString(Array.from(selectedLocations).filter(item => item.selected), 'value'),
          providerId: reduceObjectsToString(Array.from(selectedProviders).filter(item => item.selected), 'value'),
          fullscreen: isFullScreenMode ? 'true' : 'false',
        },
      },
    };
  } else {
    action = push({
      pathname: currentPath,
      search: singleLineString`
        ?encounterDate=${selectedDate}
        &statusId=${reduceObjectsToString(Array.from(selectedPatientStatusTypes).filter(item => item.selected), 'value')}
        &roomId=${reduceObjectsToString(Array.from(selectedRooms).filter(item => item.selected), 'value')}
        &locationId=${reduceObjectsToString(Array.from(selectedLocations).filter(item => item.selected), 'value')}
        &providerId=${reduceObjectsToString(Array.from(selectedProviders).filter(item => item.selected), 'value')}
        &fullscreen=${isFullScreenMode}`,
    });
  }
  return action;
};

export const goToCurrentPath = ({
  currentPath,
  isFullScreenMode,
}) => {
  let action = null;
  if (isFullScreenMode) {
    action = {
      type: LOCATION_CHANGE_FULLSCREEN,
      payload: {
        pathname: currentPath,
        query: {
          access_token: '',
          fullscreen: isFullScreenMode ? 'true' : 'false',
        },
      },
    };
  } else {
    action = push({
      pathname: currentPath,
      search: isFullScreenMode ? '?fullscreen=true&access_token=' : '',
    });
  }
  return action;
};

export const setFullScreenMode = ({ isFullScreenMode }) => ({
  type: LOCATION_SET_FULL_SCREEN_MODE,
  isFullScreenMode: isFullScreenMode === 'true',
});
