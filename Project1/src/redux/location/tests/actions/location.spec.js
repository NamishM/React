import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const currentPath = 'tasking/appointment';
const selectedDate = '2017-06-22';
const selectedPatientStatusTypes = [{
  selected: true,
  value: '14',
},
{
  selected: false,
  value: '15',
}];
const selectedRooms = [{
  selected: true,
  value: '1015',
}];
const selectedLocations = [{
  label: 'DEMOLOC',
  selected: true,
  value: '4',
}];
const selectedProviders = [{
  selected: true,
  value: '1570491970',
}];
const isFullScreenMode = true;

describe('location action', () => {
  it(`updateFilter should create ${types.LOCATION_CHANGE_FULLSCREEN} action for full screen mode`, () => {
    expect(actions.updateFilter({
      currentPath,
      selectedDate,
      selectedPatientStatusTypes,
      selectedRooms,
      selectedLocations,
      selectedProviders,
      isFullScreenMode,
    })).toEqual({
      type: types.LOCATION_CHANGE_FULLSCREEN,
      payload: {
        pathname: currentPath,
        query: {
          encounterDate: selectedDate,
          statusId: '14',
          roomId: '1015',
          locationId: '4',
          providerId: '1570491970',
          fullscreen: 'true',
        },
      },
    });
  });

  it('updateFilter should call push method when full screen mode is false', () => {
    expect(actions.updateFilter({
      currentPath,
      selectedDate,
      selectedPatientStatusTypes,
      selectedRooms,
      selectedLocations,
      selectedProviders,
      isFullScreenMode: false,
    })).toEqual({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: [{
          pathname: 'tasking/appointment',
          search: '?encounterDate=2017-06-22&statusId=14&roomId=1015&locationId=4&providerId=1570491970&fullscreen=false',
        }],
        method: 'push',
      },
    });
  });

  it(`goToCurrentPath should create ${types.LOCATION_CHANGE_FULLSCREEN} action for full screen mode`, () => {
    expect(actions.goToCurrentPath({
      currentPath,
      isFullScreenMode,
    })).toEqual({
      type: types.LOCATION_CHANGE_FULLSCREEN,
      payload: {
        pathname: currentPath,
        query: {
          access_token: '',
          fullscreen: 'true',
        },
      },
    });
  });

  it('goToCurrentPath should call push method when full screen mode is false', () => {
    expect(actions.goToCurrentPath({
      currentPath,
      isFullScreenMode: false,
    })).toEqual({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: [{
          pathname: 'tasking/appointment',
          search: '',
        }],
        method: 'push',
      },
    });
  });
});
