import * as types from '../constants/ActionTypes';
import format from 'date-fns/format';
import { taskStatus } from '../helpers/helper';
import { NO_TASKGRID_ROOM_UPDATE_SUCCEEDED }
  from '../../noTaskGrid/constants/ActionTypes';
import { createSelector } from 'reselect';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../chartBinFilter/constants/ActionTypes';
import {
  PATIENTALERT_RESIZEMODAL,
  PATIENTALERT_RESETTODEFAULT,
} from '../../patientAlert/constants/ActionTypes';

const setSateForFavoriteMenu = (state) => {
  if (state.options) {
    return state.options;
  }
  return [];
};

const initialState = {
  errorMessage: '',
  results: [],
  // finishedResults: [],
  taskState: {},
  selectedTask: {},
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },
  refreshCounter: 0,
  actionsDisabled: false,
  selectedFavorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TASK_REFRESH_COUNTER_TICK:
      return {
        ...state,
        refreshCounter: action.counter,
      };
    case types.REFRESH_TASKING_DATA:
      return {
        ...state,
        refreshCounter: 0,
      };
    case types.TASK_SAVE_SUCCESS:
      return {
        ...state,
        results: [
          ...new Set([
            ...state.results,
            action.task.encounterId,
          ]),
        ],
        selectedFavorites: [],
      };
    // case types.TASK_FETCH_TASKS_FOR_ENCOUNTER_COMPLETED:
    //   return {
    //     ...state,
    //     results: [
    //       ...new Set(
    //         state.finishedResults
    //         .concat(...action.result.patientTrackingStatuses)
    //         .concat(...state.results),
    //       ),
    //     ],
    //     finishedResults: [
    //       ...new Set(state.finishedResults.concat(...action.result.patientTrackingStatuses)),
    //     ],
    //   };
    case types.TASKINGDETAILS_LOAD_SUCCEDED:
      return {
        ...state,
        errorMessage: '',
        stats: {
          ...action.stats,
        },
        results: [
          // ...new Set(state.finishedResults.concat(...action.result.patientTrackingStatuses)),
          ...action.result.patientTrackingStatuses,
        ],
      };
    case types.TASK_CHANGE_SEQUENCE:
      return {
        ...state,
        actionsDisabled: true,
      };
    case types.TASK_CHANGE_SEQUENCE_SUCCEDED:
      return {
        ...state,
        actionsDisabled: false,
      };
    case types.TASKINGDETAILS_LOAD_FAILED:
    case types.TASK_CHANGE_SEQUENCE_FAILED:
    case types.TASK_STATUSUPDATE_FAILED:
    case types.TASK_FETCH_TASKS_FOR_ENCOUNTER_FAILED:
      return {
        ...initialState,
        errorMessage: action.errorMessage,
        actionsDisabled: false,
      };
    case CHARTBINFILTER_APPOINTMENT_FILTER:
    case CHARTBINFILTER_RESET_GRID:
      return {
        ...state,
        results: [],
        stats: {
          pageNumber: 0,
          pageSize: 0,
          startIndex: 0,
          endIndex: 0,
          totalPages: 0,
          totalResults: 0,
        },
      };
    case types.TASK_GET_ROOM_LIST:
      return {
        ...state,
        taskState: {
          ...state.taskState,
          [action.id]: {
            ...state.taskState[action.id],
            encounterId: action.encounterId,
            taskId: action.id,
            isRoomsClicked: action.isRoomsClicked,
          },
        },
      };
    case NO_TASKGRID_ROOM_UPDATE_SUCCEEDED:
      return {
        ...state,
        taskState: {
          ...state.taskState,
          [action.taskId]: {
            ...state.taskState[action.taskId],
            isRoomsClicked: false,
          },
        },
      };
    case types.TASK_FAVORITE_SUCCESS:
      return {
        ...state,
        selectedFavorites: setSateForFavoriteMenu(action),
      };
    case types.TASK_ALERT_CLICK:
      return {
        ...state,
        selectedTask: {
          personId: action.task.personId,
          isAlertExist: true,
          isVisible: true,
          isReadOnly: true,
          isExpanded: false,
          isTaskingAlert: true,
          alertDetails: {
            alertMessage: action.selectedIcon.action.text,
            titleText: `${action.task.patientName} - ${action.task.taskDetails}`,
            icon: action.selectedIcon.icon,
            iconStatus: action.selectedIcon.iconStatus,
          },
        },
      };
    case PATIENTALERT_RESIZEMODAL:
      return {
        ...state,
        selectedTask: {
          ...state.selectedTask,
          isExpanded: !state.selectedTask.isExpanded,
        },
      };
    case PATIENTALERT_RESETTODEFAULT:
      return {
        ...state,
        selectedTask: {},
      };
    default:
      return state;
  }
};

const getTaskStatusDesc = (taskId) => {
  switch (taskId) {
    case 1:
      return taskStatus.Queued.desc;
    case 2:
      return taskStatus.Waiting.desc;
    case 3:
      return taskStatus.InProgress.desc;
    case 4:
      return taskStatus.Completed.desc;
    case 5:
      return taskStatus.Hold.desc;
    case 6:
      return taskStatus.Cancelled.desc;
    default:
      return null;
  }
};

const getTaskSource = (linkedSourceId) => {
  switch (linkedSourceId) {
    case 1:
      return 'OrderGroup';
    case 2:
      return 'RxGroup';
    default:
      return 'Unstructured';
  }
};

const getPatientStatusType = (patientStatusTypes, patientStatusTypeId) => {
  const patientStatus = patientStatusTypes.find(patientStatusType =>
    patientStatusType.value === patientStatusTypeId);
  return patientStatus ? patientStatus.color : '';
};

const getAppointments = state => state.entities.appointments || {};
const getPatientTrackingStatusFromState = state =>
  (state.entities || {}).patientTrackingStatuses || {};
const getRooms = state => state.entities.rooms || {};
const getTaskingDetailsIds = state => state.taskingDetails.results || [];
const getTaskState = state => state.taskingDetails.taskState;
const getPatientStatusTypes = state => state.chartBinFilter.patientStatusTypes || [];
const getChartBinRooms = state => state.chartBinFilter.rooms || [];
const getSelectedChartEncounterId = state => (state.selectedChart || {}).encounterId || '';
const getFavouriteOptions = state => state.taskingDetails.selectedFavorites || [];

// const getLatestActiveTask = tasks => tasks.find(task =>
//     task.taskStatusId === taskStatus.Hold.id ||
//     task.taskStatusId === taskStatus.InProgress.id ||
//     task.taskStatusId === taskStatus.Queued.id ||
//     task.taskStatusId === taskStatus.Waiting.id,
//   );

const parseTask = (task, callback) => {
  const api = {
    details: '',
    icons: [],
  };

  try {
    return callback({
      ...api,
      ...JSON.parse(task),
    });
  } catch (ex) {
    return callback({
      ...api,
      details: task,
    });
  }
};

const taskDenormalizer =
  (roomId, rooms, taskState, patientStatusTypes) =>
    task => parseTask(task.taskDetails, parsedTask => ({
      taskId: task.taskId,
      patientStatusTypeId: task.pT_PatientStatusTypeId,
      taskStatusId: task.taskStatusId,
      taskStatusDesc: getTaskStatusDesc(task.taskStatusId),
      unParsedTaskDetails: task.taskDetails,
      taskDetails: parsedTask.details,
      encounterId: task.encounterId,
      roomId: task.taskStatusId === taskStatus.Completed.id ? task.roomId : roomId,
      roomDescription:
      task.taskStatusId === taskStatus.Completed.id ? // eslint-disable-line no-nested-ternary
      rooms[task.roomId] ? rooms[task.roomId].description : null :
        rooms[roomId] ? rooms[roomId].description : null,
      lastStateChange: format(task.modifiedByDateTime, 'hh:mm:ss A'),
      taskSetSequence: task.taskSetSequence,
      linkedSourceType: task.linkedSourceType,
      linkedSourceId: task.linkedSourceId,
      patientName: task.patientName,
      personId: task.personId,
      birthDate: format(task.birthDate, 'MM/DD/YYYY'),
      color: getPatientStatusType(patientStatusTypes,
        task.pT_PatientStatusTypeId),
      taskSource: getTaskSource(task.linkedSourceId),
      isRoomsClicked: taskState[task.taskId] ?
        taskState[task.taskId].isRoomsClicked : false,
      taskAlerts: parsedTask.icons,
    }),
    );

export const getDenormalizedTaskingDetails = createSelector(
  [
    getAppointments,
    getPatientTrackingStatusFromState,
    getRooms,
    getTaskingDetailsIds,
    getTaskState,
    getPatientStatusTypes,
  ],
  (
    appointments,
    patientTrackingStatuses,
    rooms,
    taskingDetailsIds,
    taskState,
    patientStatusTypes,
  ) => taskingDetailsIds.reduce((prev, encounterId) => {
    const roomId = appointments[encounterId].roomId;
    // let topTask = getLatestActiveTask(patientTrackingStatuses[encounterId]);
    const denormalize = taskDenormalizer(
      roomId,
      rooms,
      taskState,
      patientStatusTypes,
    );

    const reducedTasks = patientTrackingStatuses[encounterId].reduce((prev2, task) => {
      const dTask = denormalize(task);
      prev2.childTasks.push(dTask);
      if (
        task.taskStatusId !== taskStatus.Completed.id &&
        task.taskStatusId !== taskStatus.Cancelled.id &&
        !prev2.claimedGroups[task.pT_PatientStatusTypeId]
      ) {
        const dTopTask = { // so we're not recursive.
          ...dTask,
        };

        prev2.topTasks.push(dTopTask);
        dTopTask.children = prev2.childTasks;
        prev2.claimedGroups[task.pT_PatientStatusTypeId] = true;
      }
      return prev2;
    }, {
      claimedGroups: {},
      topTasks: [],
      childTasks: [],
    });

    prev.push(...reducedTasks.topTasks);

    return prev;
  }, []),
);

export const getSelectedRooms = createSelector(
  [getChartBinRooms],
  chartBinRooms => chartBinRooms.filter(room =>
    room.selectionSaved && room.value !== -1,
  ),
);

export const getLoadedRooms = createSelector(
  [
    getSelectedRooms,
    getTaskingDetailsIds,
    getPatientStatusTypes,
    getPatientTrackingStatusFromState,
    getAppointments,
    getRooms,
  ],
  (
    filteredData,
    taskingDetailsIds,
    patientStatusTypes,
    patientTrackingStatuses,
    appointments,
    rooms,
  ) => {
    // Get the list of available rooms.
    const normalizedRooms = filteredData.reduce((prev, roomDetails) => {
      prev[roomDetails.value] = {
        label: rooms[roomDetails.value].description,
        value: roomDetails.value,
        locationId: rooms[roomDetails.value].locationId,
        color: null,
      };
      return prev;
    }, {});

    // get the first top task for every encounter for every room
    const taskingRoomsList = taskingDetailsIds.reduce((prev, encounterId) => {
      const roomId = appointments[encounterId].roomId;
      // Has the color been set?
      if (prev[roomId] && !prev[roomId].color) {
        // get all tasks on hold or in progress for this encounter.
        const tasks = patientTrackingStatuses[encounterId].filter(taskingDetails =>
          taskingDetails.roomId === roomId &&
          (
            taskingDetails.taskStatusId === taskStatus.InProgress.id ||
            taskingDetails.taskStatusId === taskStatus.Waiting.id ||
            taskingDetails.taskStatusId === taskStatus.Hold.id
          ),
        ).reduce((taskHash, next) => { // convert to a hash table
          taskHash[next.taskStatusId] = next;
          return taskHash;
        }, {});

        let task = null;
        // get the task in priority order
        if (tasks[taskStatus.InProgress.id]) {
          task = tasks[taskStatus.InProgress.id];
        } else if (tasks[taskStatus.Waiting.id]) {
          task = tasks[taskStatus.Waiting.id];
        } else if (tasks[taskStatus.Hold.id]) {
          task = tasks[taskStatus.Hold.id];
        }

        if (task) {
          if (task.taskStatusId === taskStatus.Hold.id) {
            prev[roomId].color = 'rgb(255,40,40)';
          } else {
            prev[roomId].color = getPatientStatusType(
              patientStatusTypes,
              task.pT_PatientStatusTypeId,
            );
          }
        }
      }
      return prev;
    }, normalizedRooms);

    return Object.keys(taskingRoomsList).map(key => taskingRoomsList[key]);
  },
);

export const getPatientTrackingStatuses = (state) => {
  const filteredData = state.chartBinFilter.patientStatusTypes.filter(
    status => status.selected && status.statusType === 4,
  );
  return filteredData;
};

export const getDenormalizedPatientTaskingDetails = createSelector(
  [
    getPatientTrackingStatusFromState,
    getSelectedChartEncounterId,
    getTaskState,
    getPatientStatusTypes,
    getRooms,
    getAppointments,
  ],
  (
    patientTrackingStatuses,
    encounterId,
    taskState,
    patientStatusTypes,
    rooms,
    appointments,
  ) => {
    const roomId = (appointments[encounterId] || {}).roomId;
    const denormalize = taskDenormalizer(
      roomId,
      rooms,
      taskState,
      patientStatusTypes,
    );
    return (patientTrackingStatuses[encounterId] || [])
      .map(task => denormalize(task));
  },
);

export const getNextTaskToUpdate = (state, encounterId) => {
  const allNormalizedTasks = getDenormalizedTaskingDetails(state);
  const searchedEncounter = allNormalizedTasks.find(task =>
    task.encounterId === encounterId);
  let nextTaskToUpdate;
  if (searchedEncounter) {
    let children = searchedEncounter.children;
    if (children && children.length > 0) {
      children = children.sort((a, b) =>
        a.taskSetSequence - b.taskSetSequence,
      );
      nextTaskToUpdate = children.find(task =>
        task.taskStatusId === taskStatus.Queued.id,
      );
    }
  }
  return nextTaskToUpdate;
};

export const AnyActiveTask = (state, encounterId) => {
  const allNormalizedTasks = getDenormalizedTaskingDetails(state);
  const searchedEncounter = allNormalizedTasks.find(task =>
    task.encounterId === encounterId);
  let activeTaskList = [];
  if (searchedEncounter) {
    let children = searchedEncounter.children;
    if (children && children.length > 0) {
      children = children.sort((a, b) =>
        a.taskSetSequence - b.taskSetSequence,
      );
      activeTaskList = children.filter(task =>
        task.encounterId === encounterId &&
        (
          task.taskStatusId === taskStatus.InProgress.id ||
          task.taskStatusId === taskStatus.Waiting.id
        ),
      );
    }
  }
  return activeTaskList.length > 0;
};

export const isSeqArrowEnabled = (
  currentTask,
  index,
  allTasks,
  arrowDirection = 'up',
) => {
  let isCurrentArrowEnabled = (
    currentTask.taskStatusId === taskStatus.Queued.id ||
    currentTask.taskStatusId === taskStatus.Waiting.id
  );

  if (index === 0) {
    isCurrentArrowEnabled = (
      isCurrentArrowEnabled &&
      allTasks.filter(task =>
        task.taskSetSequence > currentTask.taskSetSequence &&
        (
          task.taskStatusId === taskStatus.Queued.id ||
          task.taskStatusId === taskStatus.Waiting.id
        ),
      ).length > 0
    );
  } else if (index < allTasks.length - 1) {
    if (arrowDirection === 'up') {
      isCurrentArrowEnabled = (
        isCurrentArrowEnabled &&
        allTasks.filter(task =>
          task.taskSetSequence < currentTask.taskSetSequence &&
          (
            task.taskStatusId === taskStatus.Queued.id ||
            task.taskStatusId === taskStatus.Waiting.id
          ),
        ).length > 0
      );
    } else {
      isCurrentArrowEnabled = (
        isCurrentArrowEnabled &&
        allTasks.filter(task =>
          task.taskSetSequence > currentTask.taskSetSequence &&
          (
            task.taskStatusId === taskStatus.Queued.id ||
            task.taskStatusId === taskStatus.Waiting.id
          ),
        ).length > 0
      );
    }
  } else {
    isCurrentArrowEnabled = (
      isCurrentArrowEnabled &&
      allTasks.filter(task =>
        task.taskSetSequence < currentTask.taskSetSequence &&
        (
          task.taskStatusId === taskStatus.Queued.id ||
          task.taskStatusId === taskStatus.Waiting.id
        ),
      ).length > 0
    );
  }

  return isCurrentArrowEnabled;
};

export const getRoomColor = (nestedTask) => {
  const taskFind = nestedTask.find(task =>
    task.taskStatusId === taskStatus.InProgress.id ||
    task.taskStatusId === taskStatus.Waiting.id,
  );
  return taskFind ? taskFind.color : 'rgb(255,40,40)';
};

// unstructuredtask favorites method start
export const getDeNormalizedPatientStatus = state =>
  state.chartBinFilter.patientStatusTypes.filter(x => x.statusType === 4)
    .map(chartbinPatientStatus => ({
      ...chartbinPatientStatus,
      selected: false,
    }),
    );

export const getStructuredFavorites = createSelector(
  [
    getFavouriteOptions,
    getPatientStatusTypes,
  ],
  (
    taskFavorites,
    patientStatusTypes,
  ) => taskFavorites.map(taskFavorite => ({
    value: taskFavorite.templateDetails,
    label: taskFavorite.templateDetails,
    color: getPatientStatusType(patientStatusTypes,
      taskFavorite.groupId),
    groupId: taskFavorite.groupId,
  })),
);

export const getTemplateMappingId = (groupId, templateDetails, favoriteOptions) => {
  const matchedOption = favoriteOptions.find(option =>
    option.groupId.toString() === groupId && option.templateDetails === templateDetails,
  );
  return matchedOption.favoritesTemplatesMappingId;
};

export const isTaskFavorite = (availableFavorites, selectedID, templateDetails) =>
  selectedID.every(groupId =>
    availableFavorites.some(favoriteItem =>
      favoriteItem.groupId === parseInt(groupId, 10) &&
    favoriteItem.label === templateDetails,
    ),
  );

export const updatePatientStatusTypes = (state, action) => {
  switch (action.type) {
    case 'Template_Select':
    {
      return {
        ...state,
        selected: state.value === action.groupId,
      };
    }
    case 'Template_Clear':
    {
      return {
        ...state,
        selected: false,
      };
    }
    default:
      return state;
  }
};
