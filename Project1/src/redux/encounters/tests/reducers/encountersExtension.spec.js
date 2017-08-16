
import { encountersExtension } from '../../reducers/encountersExtension';
import * as types from '../../../selectedChart/constants/ActionTypes';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  errorMessage: '',
  textValue: 'Search',
  isInfiniteLoading: false,
  selectedAppointmentId: null,
  results: [],
  entities: {
    appointments: {},
    demographics: {},
    ethnicities: {},
    primaryInsurances: {},
    secondaryInsurances: {},
    providers: {},
    races: {},
  },
  filters: {
    page: 0,
    startDate: null,
    endDate: null,
    personId: null,
  },
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },

};
describe('encountersExtension reducer', () => {
  const state = {
    ...initialState,
  };
  deepFreeze(state);
  it('should handle initial state', () => {
    expect(
      encountersExtension(initialState, {}),
    ).toEqual(initialState);
  });
  it('should handle SELECTED_CHART_CLEAR', () => {
    expect(encountersExtension(state, {
      type: types.SELECTED_CHART_CLEAR,
    })).toEqual({
      ...state,
      errorMessage: '',
      textValue: 'Search',
      isInfiniteLoading: false,
      selectedAppointmentId: null,
      results: [],
      entities: {
        appointments: {},
        demographics: {},
        ethnicities: {},
        primaryInsurances: {},
        secondaryInsurances: {},
        providers: {},
        races: {},
      },
      filters: {
        page: 0,
        startDate: null,
        endDate: null,
        personId: null,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 0,
        totalResults: 0,
      },
    });
  });
  it('should handle SELECTED_CHART_SET_CHART', () => {
    expect(encountersExtension(state, {
      type: types.SELECTED_CHART_SET_CHART,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
    });
  });
});
