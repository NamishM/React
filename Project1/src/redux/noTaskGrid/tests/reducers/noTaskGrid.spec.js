import * as action from '../../actions';
import noTaskGrid from '../../reducers/noTaskGrid';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const state = {
  results: [],
  trackingInfoState: {},
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },
  isInfiniteLoading: false,
  filters: {
    page: 0,
  },
};

describe('noTaskGrid reducer', () => {
  it('should handle initial state', () => {
    expect(
      noTaskGrid(undefined, {}),
    ).toEqual(state);
  });

  it('should handle NO_TASKGRID_FETCH_REQUESTED', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_FETCH_REQUESTED',
      page: 1,
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: true,
    });
  });

  it('should handle NO_TASKGRID_FETCH_SUCCEEDED', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_FETCH_SUCCEEDED',
      result: { patientTrackingInfos: [] },
      entities: { patientTrackingInfos: [] },
      stats: {
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 12,
        totalResults: 120,
      },
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 12,
        totalResults: 120,
      },
      filters: {
        ...state.filters,
        page: 1,
      },
    });
  });
  it('should handle NO_TASKGRID_FETCH_SUCCEEDED', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_FETCH_SUCCEEDED',
      result: { patientTrackingInfos: [] },
      stats: {
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 0,
        totalResults: 120,
      },
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 999,
        totalResults: 120,
      },
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: false,
    });
  });
  it('should handle NO_TASKGRID_FETCH_FAILED', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_FETCH_FAILED',
      message: 'error in API response',
    })).toEqual({
      ...state,
      errorMessage: 'error in API response',
      isInfiniteLoading: false,
    });
  });

  it('should handle CHECKOUT_ON_NO_TASKGRID_DATA_FAILED', () => {
    expect(noTaskGrid(state, {
      type: 'CHECKOUT_ON_NO_TASKGRID_DATA_FAILED',
      message: 'error in API response',
    })).toEqual({
      ...state,
      errorMessage: 'error in API response',
      isInfiniteLoading: false,
    });
  });
  it('should handle NO_TASKGRID_NEXT_PAGE', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_NEXT_PAGE',
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
    });
  });

  it('should handle NO_TASKGRID_NEXT_PAGE', () => {
    expect(noTaskGrid({
      ...state,
      filters: {
        ...state.filters,
        page: 2,
      },
      stats: {
        ...state.stats,
        totalPages: 2,
      },
    },
    {
      type: 'NO_TASKGRID_NEXT_PAGE',
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        totalPages: 2,
      },
      filters: {
        ...state.filters,
        page: 2,
      },
    });
  });

  it('should handle CHARTBINFILTER_APPOINTMENT_FILTER', () => {
    expect(noTaskGrid(state, {
      type: 'CHARTBINFILTER_APPOINTMENT_FILTER',
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 0,
      },
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
    });
  });

  it('should handle SKIP_NEXT_NO_TASKGRID_DATA', () => {
    expect(noTaskGrid(state, {
      type: 'SKIP_NEXT_NO_TASKGRID_DATA',
    })).toEqual({
      ...state,
      isInfiniteLoading: false,
    });
  });
  it('should handle LOGOUT_REQUESTED', () => {
    expect(noTaskGrid(state, {
      type: 'LOGOUT_REQUESTED',
    })).toEqual({
      ...state,
    });
  });
  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(noTaskGrid(state, {
      type: 'LOGOUT_SESSION_REMOTE_ENDED',
    })).toEqual({
      ...state,
    });
  });
  it('should handle CHARTBINFILTER_RESET_GRID', () => {
    expect(noTaskGrid(state, {
      type: 'CHARTBINFILTER_RESET_GRID',
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        totalPages: 999,
      },
    });
  });

  // it('should handle CHARTBINFILTER_APPOINTMENT_FILTER', () => {
  //  expect(noTaskGrid(state, {
  //    type: 'CHARTBINFILTER_APPOINTMENT_FILTER',
  //  })).toEqual({
  //    ...state,
  //  });
  // });

  // it('should handle NOTASKGRID_TOGGLE_VISIBLITY', () => {
  //  expect(noTaskGrid(state, {
  //    type: 'NOTASKGRID_TOGGLE_VISIBLITY',
  //    result: { patientTrackingInfos: [] },
  //    entities: { patientTrackingInfos: [] },
  //    stats: {
  //      pageNumber: 1,
  //      pageSize: 10,
  //      startIndex: 0,
  //      endIndex: 9,
  //      totalPages: 12,
  //      totalResults: 120,
  //    },
  //  })).toEqual({
  //    ...state,
  //    stats: {
  //      ...state.stats,
  //      pageNumber: 1,
  //      pageSize: 10,
  //      startIndex: 0,
  //      endIndex: 9,
  //      totalPages: 12,
  //      totalResults: 120,
  //    },
  //    filters: {
  //      ...state.filters,
  //      page: 1,
  //    },
  //    isInfiniteLoading: false,
  //  });
  // });

  it('should handle SKIP_NEXT_NO_TASKGRID_DATA', () => {
    expect(noTaskGrid(state, {
      type: 'SKIP_NEXT_NO_TASKGRID_DATA',
    })).toEqual({
      ...state,
      isInfiniteLoading: false,
    });
  });

  it('should handle NO_TASKGRID_GET_ROOM_LIST', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_GET_ROOM_LIST',
    })).toEqual({
      ...state,
      trackingInfoState: {
        ...state.trackingInfoState,
        [action.id]: {
          ...state.trackingInfoState[action.id],
          isRoomsClicked: action.isRoomsClicked,
        },
      },
    });
  });

  it('should handle NO_TASKGRID_ROOM_UPDATE_SUCCEEDED', () => {
    expect(noTaskGrid(state, {
      type: 'NO_TASKGRID_ROOM_UPDATE_SUCCEEDED',
    })).toEqual({
      ...state,
      trackingInfoState: {
        [action.encounterId]: {
          ...state.trackingInfoState[action.encounterId],
          isRoomsClicked: false,
        },
      },
    });
  });
});
