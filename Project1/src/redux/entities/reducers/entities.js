import appointmentModuleName from '../../appointmentList/constants/moduleName';
import encounterModuleName from '../../encounters/constants/moduleName';
import { generateActionTypes } from '../../appointments/constants/ActionTypes';
import {
  NO_TASKGRID_ROOM_UPDATE_SUCCEEDED,
  NO_TASKGRID_FETCH_SUCCEEDED,
  CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED,
} from '../../noTaskGrid/constants/ActionTypes';
import {
  TASKINGDETAILS_LOAD_SUCCEDED,
  TASK_SAVE_SUCCESS,
  TASK_STATUSUPDATE_SUCCEDED,
  TASK_CHANGE_SEQUENCE_SUCCEDED,
  // TASK_FETCH_TASKS_FOR_ENCOUNTER_COMPLETED,
} from '../../tasking/constants/ActionTypes';
import {
  GET_ROOMS_SUCCEDED,
  GET_PATIENT_STATUS_TYPES_SUCCEDED,
} from '../../chartBinFilter/constants/ActionTypes';
import {
  PATIENT_TRACKING_FETCH_SUCCEEDED,
} from '../../patientTracking/constants/ActionTypes';
import { createSelector } from 'reselect';
import { insertSortedTask } from '../../tasking/helpers/helper';

const appointmentTypes = generateActionTypes(appointmentModuleName);
const encounterTypes = generateActionTypes(encounterModuleName);

const initialState = {
  appointments: {},
  demographics: {},
  ethnicities: {},
  primaryInsurances: {},
  secondaryInsurances: {},
  providers: {},
  races: {},
  patientTrackingStatuses: {},
  patientTrackingInfos: {},
  rooms: {},
  taskingStatusTypes: [],
};

const updatePatientStatusTypes = (state, action) => {
  switch (action.type) {
    case GET_PATIENT_STATUS_TYPES_SUCCEDED:
      return {
        label: state.description,
        value: state.patientTrackingStatusId,
        color: `rgb(${state.color})`,
        statusType: state.subTypeId,
        selected: false,
      };
    default:
      return state;
  }
};

const entities = (state = initialState, action) => {
  switch (action.type) {
    case appointmentTypes.APPOINTMENT_FETCH_SUCCEEDED:
    case encounterTypes.APPOINTMENT_FETCH_SUCCEEDED:
      return {
        ...state,
        appointments: {
          ...state.appointments,
          ...action.entities.appointments,
        },
        demographics: {
          ...state.demographics,
          ...action.entities.demographics,
        },
        ethnicities: {
          ...state.ethnicities,
          ...action.entities.ethnicities,
        },
        primaryInsurances: {
          ...state.primaryInsurances,
          ...action.entities.primaryInsurances,
        },
        secondaryInsurances: {
          ...state.secondaryInsurances,
          ...action.entities.secondaryInsurances,
        },
        providers: {
          ...state.providers,
          ...action.entities.providers,
        },
        races: {
          ...state.races,
          ...action.entities.races,
        },
        rooms: {
          ...state.rooms,
          ...action.result.appointments.reduce((prev, next) => ({
            ...prev,
            [action.entities.appointments[next].roomId]: {
              ...state.rooms[action.entities.appointments[next].roomId],
              roomId: action.entities.appointments[next].roomId,
            },
          }), {}),
        },
      };
    case TASKINGDETAILS_LOAD_SUCCEDED:
    // case TASK_FETCH_TASKS_FOR_ENCOUNTER_COMPLETED:
      if (action.entities.patientTrackingStatuses) {
        return {
          ...state,
          appointments: {
            ...state.appointments,
            ...action.result.patientTrackingStatuses
              .reduce((prev, encounterId) => {
                const trackingStatus = action.entities.patientTrackingStatuses[encounterId].find(
                  task => task.taskStatusId !== 4);
                prev[encounterId] = {
                  ...(state.appointments[encounterId] || {}),
                  roomId: trackingStatus.roomId,
                };
                return prev;
              }, {}),
          },
          patientTrackingStatuses: {
            ...state.patientTrackingStatuses,
            ...action.entities.patientTrackingStatuses,
          },
        };
      }
      return state;
    case NO_TASKGRID_FETCH_SUCCEEDED:
    case PATIENT_TRACKING_FETCH_SUCCEEDED:
      return {
        ...state,
        appointments: {
          ...state.appointments,
          ...action.result.patientTrackingInfos
            .reduce((prev, next) => {
              const taskingInfo = action.entities.patientTrackingInfos[next];
              prev[taskingInfo.appointmentId] = {
                ...(state.appointments[taskingInfo.appointmentId] || {}),
                roomId: taskingInfo.currentRoomId,
              };
              return prev;
            }, {}),
        },
        patientTrackingInfos: {
          ...state.patientTrackingInfos,
          ...action.entities.patientTrackingInfos,
        },
        rooms: {
          ...state.rooms,
          ...action.result.patientTrackingInfos.reduce((prev, next) => ({
            ...prev,
            [action.entities.patientTrackingInfos[next].currentRoomId]: {
              ...state.rooms[action.entities.patientTrackingInfos[next].currentRoomId],
              roomId: action.entities.patientTrackingInfos[next].currentRoomId,
              description: action.entities.patientTrackingInfos[next].currentRoomDescription,
              locationId: action.entities.patientTrackingInfos[next].currentRoomId ?
                (
                  state.rooms[
                    action.entities.patientTrackingInfos[next].currentRoomId
                  ].locationId || null
                ) : null,
            },
          }), {}),
        },
      };
    case CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED:
      return {
        ...state,
        patientTrackingInfos: {
          ...state.patientTrackingInfos,
          [action.checkoutDetails.appointmentId]: {
            ...state.patientTrackingInfos[action.checkoutDetails.appointmentId],
            checkOutTime: action.checkoutDetails.checkOutTime,
          },
        },
      };
    case NO_TASKGRID_ROOM_UPDATE_SUCCEEDED:
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.encounterId]: {
            ...state.appointments[action.encounterId],
            roomId: action.newRoomId,
          },
        },
        rooms: {
          // TODO: There is a race condition here.
          // What if another browser updates the room status? What does that
          // do to the count, how do we keep it in sync?
          ...state.rooms,
          [action.newRoomId]: {
            ...state.rooms[action.newRoomId],
            description: action.newRoomDesc,
            noOfPatientInRoom: state.rooms[action.newRoomId].noOfPatientInRoom + 1,
          },
          [action.existingRoomId]: {
            ...state.rooms[action.existingRoomId],
            noOfPatientInRoom: state.rooms[action.existingRoomId].noOfPatientInRoom - 1,
          },
        },
      };
    case TASK_SAVE_SUCCESS:
      return {
        ...state,
        patientTrackingStatuses: {
          ...state.patientTrackingStatuses,
          [action.task.encounterId]: insertSortedTask(
            action.task,
            state.patientTrackingStatuses[action.task.encounterId] || [],
          ),
        },
      };
    case TASK_STATUSUPDATE_SUCCEDED:
      return {
        ...state,
        patientTrackingStatuses: {
          ...state.patientTrackingStatuses,
          [action.updatedresult.encounterId]:
          state.patientTrackingStatuses[action.updatedresult.encounterId]
            .map(task =>
              (
                task.taskId === action.updatedresult.taskId
                  ? action.updatedresult : task
              ),
            ),
        },
      };
    case TASK_CHANGE_SEQUENCE_SUCCEDED:
      return {
        ...state,
        patientTrackingStatuses: {
          ...state.patientTrackingStatuses,
          [action.updatedSequence.encounterId]:
          state.patientTrackingStatuses[action.updatedSequence.encounterId]
            .map(task =>
              (
                task.taskId === action.updatedSequence.taskId
                  ? action.updatedSequence : task
              ),
            )
            .sort((a, b) => a.taskSetSequence - b.taskSetSequence),
        },
      };
    case GET_ROOMS_SUCCEDED:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          ...action.rooms.reduce((prev, room) => ({
            ...prev,
            [room.id]: {
              description: room.description,
              roomId: room.id,
              locationId: room.locationID,
              maxPatients: room.maxPatients,
              noOfPatientInRoom: room.noOfPatientInRoom,
            },
          }), {}),
        },
      };
    case GET_PATIENT_STATUS_TYPES_SUCCEDED:
      return {
        ...state,
        taskingStatusTypes: {
          ...state.taskingStatusTypes,
          ...action.patientStatusTypes.filter(x => x.subTypeId === 4)
            .reduce((prev, taskingStatusType) => ({
              ...prev,
              [taskingStatusType.patientTrackingStatusId]:
              updatePatientStatusTypes(taskingStatusType, action),
            }),
            {}),
        },
      };
    default:
      return state;
  }
};

export default entities;

const getChartBinRooms = state => state.chartBinFilter.rooms;
const getRooms = state => state.entities.rooms;

export const getRoomsFromChartBinSelection = createSelector(
  [getChartBinRooms, getRooms],
  (roomSelections, rooms) => roomSelections.map(room => ({
    ...room,
    ...rooms[room.value],
  })),
);
