import * as types from '../../selectedChart/constants/ActionTypes';

export const encountersExtension = (state, action) => {
  switch (action.type) {
    case types.SELECTED_CHART_CLEAR:
      return {
        ...state,
        errorMessage: '',
        textValue: 'Search',
        isInfiniteLoading: false,
        selectedAppointmentId: null,
        results: [],
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
    case types.SELECTED_CHART_SET_CHART:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
      };
    default:
      return state;
  }
};
