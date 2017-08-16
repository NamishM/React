
import { call, select, put } from 'redux-saga/effects';
import { getAppointmentInfo } from '../../api';
import { generateSagas } from '../../sagas';
import { getFilterCriteria } from '../../../chartBinFilter/reducers/chartBinFilter';
import { generateActions } from '../../actions';

const prefix = 'APPOINTMENTS';
const actions = generateActions(prefix);
const { bindAppointmentList } = generateSagas(prefix);

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const request = {
  page: 1,
  sortColumns: {
    0: {
      name: 'PersonDeskDate',
      label: 'Time',
      state: 'asc',
    },
    1: {
      name: '',
      label: 'Name',
      state: 'none',
    },
    2: {
      name: 'ReasonCode',
      label: 'Reason',
      state: 'none',
    },
    3: {
      name: '',
      label: 'BirthDate',
      state: 'none',
    },
  },
  sortColumnPrecedence: [0],
  startDate: '08/09/2016',
  endDate: '08/10/2016',
  personId: 9783,
};

const orderByColumns = request.sortColumnPrecedence ?
  request.sortColumnPrecedence.map(key => request.sortColumns[key])
  : [];
const defaultProviders = [{
  value: 1570491970,
}];
const defaultLocations = [{
  value: 1,
}];
const defaultPatientStatusTypes = [{
  value: 1,
}];
const appointments =
  {
    0: [
      {
        personId: 40060,
        patientId: 40060,
        personDeskId: 1570491970,
        personDeskDate: '2007-09-06T08:18:34',
        appointmentId: '',
        reasonCode: 'New Patient',
        formsPrinted: null,
        note: '',
        type: '',
        encounterId: '6e0f33d1-1ce1-4784-b170-7c82be7f2fdd',
        locationId: 1,
        chargeStatus: 0,
        isTransfer: null,
        medicationsVerified: null,
        isRescheduled: false,
        isDeleted: false,
        startTime: null,
        closeTime: null,
        roomDescription: null,
        patientDemographics: null,
      },
    ],
    entities: {
      appointments: {
        0: {
          Id: 1,
          isRowSelected: true,
          effectiveTime: '08:45 AM',
          firsName: 'James',
          lastName: 'Noble',
          appointmentReason: 'R1A',
          birthDate: '12/23/2016',
        },
      },
    },
    stats:
    {
      totalResults: 143,
      totalPages: 15,
      pageSize: 10,
      pageNumber: 1,
      startIndex: 0,
      endIndex: 9,
    },
  };

describe('chartBin saga: bindAppointmentList', () => {
  it('should call our getAppointmentInfo ' +
      'API and then call the succeed action', () => {
    const generator = bindAppointmentList(request);

    // move to the first yield statement to get user id
    let next = generator.next();

    expect(next.value).toEqual(
      select(getFilterCriteria));

    // move to the second yield statement
    next = generator.next({
      selectedProviders: defaultProviders,
      selectedLocations: defaultLocations,
      selectedRooms: [],
      selectedPatientStatusTypes: defaultPatientStatusTypes,
      startDate: '09/02/2016',
      endDate: '09/03/2016',
    });

    expect(next.value).toEqual(
      call(
        getAppointmentInfo,
        1,
        orderByColumns,
        '09/02/2016',
        '09/03/2016',
        '1570491970',
        '$true,1',
        '',
        '1',
        'CurrentPatientStatusTypeID',
        'RoomId',
        request.personId,
        prefix,
      ));

    next = generator.next(appointments);

    expect(next.value).toEqual(put(actions.getAppointmentSucceeded(
      appointments.result,
      appointments.entities,
      appointments.stats,
    )));
  });
});

describe('chartBin saga: bindAppointmentList', () => {
  it('should call our getAppointmentInfo ' +
  'API and then call the failed action', () => {
    const generator = bindAppointmentList(request);

    // move to the first yield statement to get user id
    let next = generator.next();

    expect(next.value).toEqual(
      select(getFilterCriteria));

    // move to the second yield statement
    next = generator.next({
      selectedProviders: defaultProviders,
      selectedLocations: defaultLocations,
      selectedRooms: [],
      startDate: '09/02/2016',
      endDate: '09/03/2016',
    });

    // Mock the failure of our API call
    next = generator.throw(new Error('API called failed'));

    expect(next.value).toEqual(put(actions.getAppointmentFailed('API called failed')));
  });
});
