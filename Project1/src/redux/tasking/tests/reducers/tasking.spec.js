
import taskingDetails from '../../reducers/taskingDetails';
import * as index from '../../reducers/index';
import nestedTaskReducer from '../../reducers/nestedTaskReducer';
import filtersReducer from '../../reducers/filtersReducer';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import { NO_TASKGRID_ROOM_UPDATE_SUCCEEDED }
  from '../../../noTaskGrid/constants/ActionTypes';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../../chartBinFilter/constants/ActionTypes';
import {
  PATIENTALERT_RESIZEMODAL,
  PATIENTALERT_RESETTODEFAULT,
} from '../../../patientAlert/constants/ActionTypes';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  errorMessage: '',
  results: [],
  taskState: {},
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },
  selectedTask: {},
  refreshCounter: 0,
  actionsDisabled: false,
  selectedFavorites: [],
};

const initialNestsedTaskState = {
  isNestedTaskVisible: false,
  isNoTaskGridVisible: false,
};

const initialFilterState = {
  isFilterBoardVisible: false,
};

describe('taskingDetails reducer', () => {
  it('should handle initial state', () => {
    expect(
      taskingDetails(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle TASK_REFRESH_COUNTER_TICK', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_REFRESH_COUNTER_TICK,
      counter: 4,
    })).toEqual({
      ...initialState,
      refreshCounter: 4,
    });
  });

  it('should handle REFRESH_TASKING_DATA', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.REFRESH_TASKING_DATA,
    })).toEqual({
      ...initialState,
      refreshCounter: 0,
    });
  });

  // it('should handle TASK_SAVE_SUCCESS', () => {
  // const state = {
  //   ...initialState,
  // };
  // deepFreeze(state);

  // expect(taskingDetails(state, {
  //   type: types.TASK_SAVE_SUCCESS,
  //   task: {},
  //  })).toEqual({
  //   ...initialState,
  // });
  // });

  it('should handle TASKINGDETAILS_LOAD_SUCCEDED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASKINGDETAILS_LOAD_SUCCEDED,
      result: { patientTrackingStatuses: [5, 6] },
      taskState: {},
      stats: {
        endIndex: 4,
        pageNumber: 1,
        pageSize: 999,
        startIndex: 0,
        totalPages: 1,
        totalResults: 5,
      },
      refreshCounter: 0,
    })).toEqual({
      errorMessage: '',
      results: [5, 6],
      taskState: {},
      selectedTask: {},
      stats: {
        endIndex: 4,
        pageNumber: 1,
        pageSize: 999,
        startIndex: 0,
        totalPages: 1,
        totalResults: 5,
      },
      refreshCounter: 0,
      actionsDisabled: false,
      selectedFavorites: [],
    });
  });

  it('should handle TASK_CHANGE_SEQUENCE', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_CHANGE_SEQUENCE,
    })).toEqual({
      ...initialState,
      actionsDisabled: true,
    });
  });

  it('should handle TASK_CHANGE_SEQUENCE_SUCCEDED', () => {
    const state = {
      ...initialState,
      actionsDisabled: true,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_CHANGE_SEQUENCE_SUCCEDED,
    })).toEqual({
      ...initialState,
      actionsDisabled: false,
    });
  });

  it('should handle TASKINGDETAILS_LOAD_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASKINGDETAILS_LOAD_FAILED,
      errorMessage: 'Error in API Response',
    })).toEqual({
      ...initialState,
      errorMessage: 'Error in API Response',
      actionsDisabled: false,
      selectedFavorites: [],
    });
  });

  it('should handle case types.TASK_CHANGE_SEQUENCE_FAILED:', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_CHANGE_SEQUENCE_FAILED,
      errorMessage: 'Error in API Response',
    })).toEqual({
      ...initialState,
      errorMessage: 'Error in API Response',
      actionsDisabled: false,
    });
  });

  it('should handle TASK_STATUSUPDATE_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_STATUSUPDATE_FAILED,
      errorMessage: 'Error in API Response',
    })).toEqual({
      ...initialState,
      errorMessage: 'Error in API Response',
      actionsDisabled: false,
    });
  });

  it('should handle TASK_FETCH_TASKS_FOR_ENCOUNTER_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_FETCH_TASKS_FOR_ENCOUNTER_FAILED,
      errorMessage: 'error in fetching encounter task',
    })).toEqual({
      ...initialState,
      errorMessage: 'error in fetching encounter task',
      actionsDisabled: false,
    });
  });

  it('should handle TASK_GET_ROOM_LIST', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_GET_ROOM_LIST,
      encounterId: 'GUID',
      id: 3,
      isRoomsClicked: false,
    })).toEqual({
      ...initialState,
      taskState: {
        ...initialState.taskState,
        3: {
          ...initialState.taskState[3],
          encounterId: 'GUID',
          taskId: 3,
          isRoomsClicked: false,
        },
      },
    });
  });

  it('should handle CHARTBINFILTER_APPOINTMENT_FILTER', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: CHARTBINFILTER_APPOINTMENT_FILTER,
      selectedProviders: [],
      selectedLocations: [],
      selectedRooms: [],
      selectedPatientStatusTypes: [],
      selectedDate: 'YYYY-MM-DD',
    })).toEqual({
      ...initialState,
      results: [],
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

  it('should handle CHARTBINFILTER_RESET_GRID', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: CHARTBINFILTER_RESET_GRID,
      selectedAppointmentId: null,
      results: [],
      entities: {},
      filters: {},
      stats: {},
      sort: {},
    })).toEqual({
      ...initialState,
      results: [],
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

  it('should handle NO_TASKGRID_ROOM_UPDATE_SUCCEEDED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: NO_TASKGRID_ROOM_UPDATE_SUCCEEDED,
      encounterId: 'GUID',
      existingRoomId: 12,
      newRoomId: 13,
      newRoomDesc: 'New Room',
      taskId: 12,
    })).toEqual({
      ...initialState,
      taskState: {
        ...initialState.taskState,
        12: {
          ...initialState.taskState[12],
          isRoomsClicked: false,
        },
      },
    });
  });

  it('should handle TASK_ALERT_CLICK', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: types.TASK_ALERT_CLICK,
      task: {
        personId: 1,
        patientName: 'Carter, Jimmy',
        taskDetails: 'X-ray for Carter',
      },
      selectedIcon: {
        icon: 'fa-info',
        iconStatus: 'info',
        action: {
          text: 'Special instructions',
        },
      },
    })).toEqual({
      ...initialState,
      selectedTask: {
        personId: 1,
        isAlertExist: true,
        isVisible: true,
        isReadOnly: true,
        isExpanded: false,
        isTaskingAlert: true,
        alertDetails: {
          alertMessage: 'Special instructions',
          titleText: 'Carter, Jimmy - X-ray for Carter',
          icon: 'fa-info',
          iconStatus: 'info',
        },
      },
    });
  });

  it('should handle PATIENTALERT_RESIZEMODAL', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: PATIENTALERT_RESIZEMODAL,
    })).toEqual({
      ...initialState,
      selectedTask: {
        ...state.selectedTask,
        isExpanded: !state.selectedTask.isExpanded,
      },
    });
  });

  it('should handle PATIENTALERT_RESETTODEFAULT', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingDetails(state, {
      type: PATIENTALERT_RESETTODEFAULT,
    })).toEqual({
      ...initialState,
      selectedTask: {},
    });
  });
});

describe('taskingDetails index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ filtersReducer, nestedTaskReducer, taskingDetails });
  });
});

describe('filtersReducer reducer', () => {
  it('should handle initial state', () => {
    expect(
      filtersReducer(undefined, {}),
    ).toEqual(initialFilterState);
  });
  it('should handle FILTERS_TOGGLE_VISIBLITY', () => {
    const state = {
      ...initialFilterState,
    };
    deepFreeze(state);

    expect(filtersReducer(state, {
      type: types.FILTERS_TOGGLE_VISIBLITY,
    })).toEqual({
      ...initialFilterState,
      isFilterBoardVisible: true,
    });
  });
});

describe('nestedTaskReducer reducer', () => {
  it('should handle initial state', () => {
    expect(
      nestedTaskReducer(undefined, {}),
    ).toEqual(initialNestsedTaskState);
  });
  it('should handle NESTEDTASK_TOGGLE_VISIBLITY', () => {
    const state = {
      ...initialNestsedTaskState,
    };
    deepFreeze(state);

    expect(nestedTaskReducer(state, {
      type: types.NESTEDTASK_TOGGLE_VISIBLITY,
    })).toEqual({
      ...initialNestsedTaskState,
      isNestedTaskVisible: true,
      isNoTaskGridVisible: false,
    });
  });

  it('should handle NOTASKGRID_TOGGLE_VISIBLITY', () => {
    const state = {
      ...initialNestsedTaskState,
    };
    deepFreeze(state);

    expect(nestedTaskReducer(state, {
      type: types.NOTASKGRID_TOGGLE_VISIBLITY,
    })).toEqual({
      ...initialNestsedTaskState,
      isNestedTaskVisible: false,
      isNoTaskGridVisible: true,
    });
  });
});

