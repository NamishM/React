
import * as actions from '../../actions';
import { call, put } from 'redux-saga/effects';
// import { getUserId } from '../../../user/reducers/login.js';
import {
  getProviders,
  getLocations,
  getPatientStatusTypes,
  getRooms,
  // getAppointmentFilterInfo,
} from '../../api';
import {
  bindProviders,
  bindLocations,
  bindPatientStatusTypes,
  bindRooms,
  // bindInitialDataRequired,
} from '../../sagas';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const locations = [{
  locationId: 1,
  friendlyName: 'SRSSoft',
},
{
  locationId: 2,
  friendlyName: 'SRS Super',
}];

let rooms = [{
  id: '1234',
  description: 'Loation 1',
  locationId: '1',
},
{
  id: '5678',
  description: 'Loation 2',
  locationId: '2',
},
{
  id: '91011',
  description: 'Loation 3',
  locationId: '3',
}];

const providers = [{
  personId: 97704465753,
  doctorName: 'Fast, Richard',
},
{
  personId: 60471666849,
  doctorName: 'Bourne, Rebecca',
}];
let patientStatusTypes = [
  {
    description: 'ew',
    patientTrackingStatusId: '1',
  },
  {
    description: 'status',
    patientTrackingStatusId: '2',
  }];
// const userId = 27;
// const appointmentFilters =
//  [
//    {
//      userId: 27,
//      defaults: {
//        locations: [
//          {
//            locationId: 1,
//            friendlyName: 'SRSSoft',
//          },
//        ],
//        doctors: [
//          {
//            personId: 60471666849,
//            doctorName: 'Bourne, Rebecca',
//          },
//        ],
//      },
//    },
//  ];

describe('chartBinFilter sagas', () => {
  describe('bindProviders', () => {
    it(`should call our getProviders API.
      When successful, it should then call the success action`, () => {
        const generator = bindProviders();

        // move to the first yield statement
        let next = generator.next();

        // First we should get all Providers
        expect(next.value).toEqual(call(getProviders));

        // Mock setting the value to skip the API call
        next = generator.next(providers);

        // Second we should be calling getProvidersSucceeded
        expect(next.value).toEqual(put(actions.getProvidersSucceeded(providers)));
      });

    it(`should call our getProviders API.
      When it fails, it should call the failure action`, () => {
        const generator = bindProviders();
        const msg = 'Not Found';

        // move to the first yield statement
        let next = generator.next();

        // First we should get all Providers
        expect(next.value).toEqual(call(getProviders));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.getProvidersFailed(msg)));
      });
  });

  describe('bindLocations', () => {
    it(`should call our getLocations API.
      When successful, it should then call the success action`, () => {
        const generator = bindLocations();

        // move to the first yield statement
        let next = generator.next();

        // First we should getLocations
        expect(next.value).toEqual(call(getLocations));

        // Mock setting the value to skip the API call
        next = generator.next(locations);

        // Second we should be calling getLocationsSucceeded
        expect(next.value).toEqual(put(actions.getLocationsSucceeded(locations)));
      });

    it(`should call our getLocations API.
      When it fails, it should call the failure action`, () => {
        const msg = 'Bad request';
        const generator = bindLocations();

        // move to the first yield statement
        let next = generator.next();

        // First we should read getLocations
        expect(next.value).toEqual(call(getLocations));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.getLocationsFailed(msg)));
      });
  });

  describe('bindRooms', () => {
    it(`should call our getRoom, API.
      When successful, it should then call the success action`, () => {
        const generator = bindRooms();

        // move to the first yield statement
        let next = generator.next();

        // First we should get all Providers
        expect(next.value).toEqual(call(getRooms));

        // Mock setting the value to skip the API call
        next = generator.next(rooms);
        rooms = [
          {
            description: 'No Room',
            id: -1,
            locationID: -1,
          },
          {
            id: '1234',
            description: 'Loation 1',
            locationId: '1',
          },
          {
            id: '5678',
            description: 'Loation 2',
            locationId: '2',
          },
          {
            id: '91011',
            description: 'Loation 3',
            locationId: '3',
          },
        ];
        // Second we should be calling getProvidersSucceeded
        expect(next.value).toEqual(put(actions.getRoomsSucceeded(rooms)));
      });

    it(`should call our getRoom API.
      When it fails, it should call the failure action`, () => {
        const generator = bindRooms();
        const msg = 'Not Found';

        // move to the first yield statement
        let next = generator.next();

        // First we should get all Providers
        expect(next.value).toEqual(call(getRooms));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.getRoomsFailed(msg)));
      });
  });

  describe('bindPatientStatusTypes', () => {
    it(`should call our PatientTrackingStatus API.
      When successful, it should then call the success action`, () => {
        const generator = bindPatientStatusTypes();

        // move to the first yield statement
        let next = generator.next();

        // First we should getPatientStatusTypes
        expect(next.value).toEqual(call(getPatientStatusTypes));
        // Mock setting the value to skip the API call
        next = generator.next(patientStatusTypes);
        patientStatusTypes = [
          {
            description: 'No Status',
            patientTrackingStatusId: -1,
            subTypeId: -1,
            color: 'no color',
          },
          {
            description: 'ew',
            patientTrackingStatusId: '1',
          },
          {
            description: 'status',
            patientTrackingStatusId: '2',
          },
        ];
        // Second we should be calling getPatientStatusTypesSucceeded
        expect(next.value).toEqual(put(actions.getPatientStatusTypesSucceeded(patientStatusTypes)));
      });

    it(`should call our getPatientStatusTypes API.
      When it fails, it should call the failure action`, () => {
        const msg = 'Bad request';
        const generator = bindPatientStatusTypes();

        // move to the first yield statement
        let next = generator.next();

        // First we should read getPatientStatusTypes
        expect(next.value).toEqual(call(getPatientStatusTypes));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.getPatientStatusTypesFailed(msg)));
      });
  });
  // describe('bindInitialDataRequired', () => {
  //  it(`should:
  //      1. call the bindProviders,
  //      2. call the bindLocations,
  //      3. if above 2 steps success then, it should call getAppointmentFilterInfo API`, () => {
  //        const generator = bindInitialDataRequired();

  //    let next = generator.next();

  //      // First we should check isDefaultLoaded
  //    expect(next.value).toEqual(select(
  //      state => state = {chartBinFilter: {isDefaultLoaded: false } }
  //    ));

  //    next = generator.next({ isDefaultLoaded: false });

  //    // First we should bindProviders
  //    expect(next.value).toEqual(call(bindProviders));

  //    next = generator.next();

  //    // Second we should bindLocations
  //    expect(next.value).toEqual(call(bindLocations));

  //    next = generator.next();

  //    // get current logged in user id.
  //    expect(next.value).toEqual(
  //      select(getUserId));

  //    next = generator.next({ userId });

  //    // third we should getAppointmentFilterInfo
  //    expect(next.value).toEqual(
  //      call(
  //        getAppointmentFilterInfo,
  //        userId
  //      ));

  //    next = generator.next(appointmentFilters);

  //    // lasr we should defaultChartBinSelection action
  //    expect(next.value).toEqual(
  //      put(
  //        actions.defaultChartBinSelection(
  //          appointmentFilters[0].defaults.doctors,
  //          appointmentFilters[0].defaults.locations
  //        )
  //      ));
  //  });
  // });
});

