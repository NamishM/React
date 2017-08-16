
import { location, getPaths, getCurrentLocation } from '../../reducers';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const payloadDesc = {
  pathname: 'desktop',
  search: '',
  hash: '',
  action: 'PUSH',
  key: 'ychzpp',
  basename: '/SRSUI/Mobile/',
  query: null,
};


const initialState = {
  currentPath: '',
  previousPath: '',
  isFullScreenMode: false,
};

describe('location reducer', () => {
  deepFreeze(initialState);
  it('location handle initial state', () => {
    expect(
      location(undefined, {}),
    ).toEqual(initialState);
  });
  const state = {
    ActionPath: '',
    previousPath: '',
  };
  deepFreeze(state);
  it('should handle LOCATION_CHANGE', () => {
    expect(
      location(state, {
        type: types.LOCATION_CHANGE,
        payload: payloadDesc,
      }),
    ).toEqual({
      ...state,
      currentPath: 'desktop',
      previousPath: state.currentPath,
    });
  });

  it('should handle LOCATION_SET_FULL_SCREEN_MODE', () => {
    expect(
      location(state, {
        type: types.LOCATION_SET_FULL_SCREEN_MODE,
        isFullScreenMode: true,
      }),
    ).toEqual({
      ...state,
      isFullScreenMode: true,
    });
  });
});
describe('Location Function', () => {
  it('should handle getPaths  Funtion with basename', () => {
    const state = {
      routing: {
        currentPath: 'UT_currentPath',
        previousPath: 'UT_previousPath',
        locationBeforeTransitions: {
          basename: 'UT_basename',
        },
      },
    };
    expect(getPaths(state)).toEqual({
      currentPath: 'UT_currentPath',
      previousPath: 'UT_previousPath',
      basename: 'UT_basename',
    });
  });
});
it('should handle getPaths  Funtion without basename', () => {
  const state = {
    routing: {
      currentPath: 'UT_currentPath',
      previousPath: 'UT_previousPath',
      locationBeforeTransitions: null,
    },
  };
  expect(getPaths(state)).toEqual({
    currentPath: 'UT_currentPath',
    previousPath: 'UT_previousPath',
    basename: '/',
  });
});

it('should handle getCurrentLocation  Funtion without basename', () => {
  const state = {
    routing: {
      currentPath: 'UT_currentPath',
    },
  };
  expect(getCurrentLocation(state)).toEqual('UT_currentPath');
});
