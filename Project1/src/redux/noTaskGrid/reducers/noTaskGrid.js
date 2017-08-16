import * as types from '../constants/ActionTypes';
import {
  CHARTBINFILTER_RESET_GRID,
  CHARTBINFILTER_APPOINTMENT_FILTER,
} from '../../chartBinFilter/constants/ActionTypes';
import {
  NOTASKGRID_TOGGLE_VISIBLITY,
} from '../../tasking/constants/ActionTypes';
import { taskStatus } from '../../tasking/helpers/helper';
import { createSelector } from 'reselect';
import { getDenormalizedTaskingDetails }
  from '../../tasking/reducers/taskingDetails';

const initialState = {
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

const noTaskGrid = (state = initialState, action) => {
  switch (action.type) {
    case types.NO_TASKGRID_FETCH_REQUESTED:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.page,
        },
        isInfiniteLoading: true,
      };
    case types.NO_TASKGRID_FETCH_SUCCEEDED:
    {
      return {
        ...state,
        stats: {
          // TO DO: its a work around in case of no results next filter click was not working
          ...action.stats,
          totalPages: action.stats.totalPages === 0 ? 999 : action.stats.totalPages,
        },
        filters: {
          ...state.filters,
          page: action.stats.pageNumber,
        },
        isInfiniteLoading: false,
        results: [
          ...state.results,
          ...action.result.patientTrackingInfos,
        ],
      };
    }
    case types.NO_TASKGRID_FETCH_FAILED:
      return {
        ...state,
        errorMessage: action.message,
        isInfiniteLoading: false,
      };
    case types.CHECKOUT_ON_NO_TASKGRID_DATA_FAILED:
      return {
        ...state,
        errorMessage: action.message,
        isInfiniteLoading: false,
      };
    case types.NO_TASKGRID_NEXT_PAGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          // Limit to total available pages
          // paging starts from page == 1,
          // because appointment api gives result same for page = 0 and page = 1
          page: state.filters.page === 0 ||
            state.filters.page + 1 < state.stats.totalPages
            ? state.filters.page + 1 : state.stats.totalPages,
        },
      };
    case 'LOGOUT_REQUESTED':
    case 'LOGOUT_SESSION_REMOTE_ENDED':
      return initialState;
    case CHARTBINFILTER_RESET_GRID:
    case CHARTBINFILTER_APPOINTMENT_FILTER:
    case NOTASKGRID_TOGGLE_VISIBLITY:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
        results: [],
        stats: {
          pageNumber: 0,
          pageSize: 0,
          startIndex: 0,
          endIndex: 0,
          totalPages: 999,
          totalResults: 0,
        },
      };
    case types.SKIP_NEXT_NO_TASKGRID_DATA:
      return {
        ...state,
        isInfiniteLoading: false,
      };
    case types.NO_TASKGRID_GET_ROOM_LIST:
      return {
        ...state,
        trackingInfoState: {
          ...state.trackingInfoState,
          [action.id]: {
            ...state.trackingInfoState[action.id],
            isRoomsClicked: action.isRoomsClicked,
          },
        },
      };
    case types.NO_TASKGRID_ROOM_UPDATE_SUCCEEDED:
      return {
        ...state,
        trackingInfoState: {
          [action.encounterId]: {
            ...state.trackingInfoState[action.encounterId],
            isRoomsClicked: false,
          },
        },
      };
    default:
      return state;
  }
};

export default noTaskGrid;

const getAppointments = state => state.entities.appointments;
const getPatientTrackingInfos = state => state.entities.patientTrackingInfos;
const getRooms = state => state.entities.rooms;
const getNoTaskGridIds = state => state.noTaskGrid.results;
const getTrackingInfoState = state => state.noTaskGrid.trackingInfoState;

export const getDenormalizedNoTaskGridData = createSelector(
  [
    getAppointments,
    getPatientTrackingInfos,
    getRooms,
    getNoTaskGridIds,
    getTrackingInfoState,
    getDenormalizedTaskingDetails,
  ],
  (
    appointments,
    patientTrackingInfos,
    rooms,
    ids,
    trackingInfoState,
    taskList,
  ) => ids.map((id) => {
    const roomId = appointments[id].roomId;
    return {
      dob: patientTrackingInfos[id].patientDemographics.birthDate,
      name: patientTrackingInfos[id].name,
      doctorname: patientTrackingInfos[id].doctorName,
      id,
      encounterDate: patientTrackingInfos[id].personDeskDate,
      roomDescription: rooms[roomId] ? rooms[roomId].description : null,
      currentRoomId: roomId,
      status: patientTrackingInfos[id].currentPatientStatusTypeDescription,
      duration: patientTrackingInfos[id].currentPatientStatusElapsedTime,
      color: patientTrackingInfos[id].color,
      appointmentId: patientTrackingInfos[id].appointmentId,
      checkOutTime: patientTrackingInfos[id].checkOutTime,
      locationId: patientTrackingInfos[id].locationId,
      actualStatus: patientTrackingInfos[id].actualStatus,
      isTaskAvailable: taskList.some(task =>
        id === task.encounterId &&
        task.taskStatusDesc !== taskStatus.Completed.desc &&
        task.taskStatusDesc !== taskStatus.Cancelled.desc,
      ),
      isRoomsClicked: trackingInfoState[id] ?
        trackingInfoState[id].isRoomsClicked : false,
    };
  }),
);
