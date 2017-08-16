import * as types from '../constants/ActionTypes';

export const getNoTaskGridData = page => ({
  type: types.NO_TASKGRID_FETCH_REQUESTED,
  page,
});

export const getNoTaskGridSucceeded = (result, entities, stats) => ({
  type: types.NO_TASKGRID_FETCH_SUCCEEDED,
  result,
  entities,
  stats,
});

export const getNoTaskGridFailed = (message = 'error in API response') => ({
  type: types.NO_TASKGRID_FETCH_FAILED,
  message,
});

export const getNextPage = () => ({
  type: types.NO_TASKGRID_NEXT_PAGE,
});

export const skipNoTaskGridNextDataFlow = () => ({
  type: types.SKIP_NEXT_NO_TASKGRID_DATA,
});

export const checkOutPatientRequested = (id,
  locationId, currentRoomId) => ({
  type: types.CHECKOUT_ON_NO_TASKGRID_DATA_REQUESTED,
  id,
  locationId,
  currentRoomId,
});

export const checkOutPatientSucceded = checkoutDetails => ({
  type: types.CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED,
  checkoutDetails,
});

export const checkOutPatientFailed = (message = 'error in API response') => ({
  type: types.CHECKOUT_ON_NO_TASKGRID_DATA_FAILED,
  message,
});

export const noTaskRoomUpdateRequested = (encounterId, taskId, existingRoomId, newRoomId) => ({
  type: types.NO_TASKGRID_ROOM_UPDATE_REQUESTED,
  encounterId,
  taskId,
  existingRoomId,
  newRoomId,
});

export const noTaskRoomUpdateSucceeded = (encounterId,
  taskId,
  existingRoomId,
  newRoomId,
  newRoomDesc,
) => ({
  type: types.NO_TASKGRID_ROOM_UPDATE_SUCCEEDED,
  encounterId,
  taskId,
  existingRoomId,
  newRoomId,
  newRoomDesc,
});

export const noTaskRoomUpdateFailed = (errorMessage = 'error in API response') => ({
  type: types.NO_TASKGRID_ROOM_UPDATE_FAILED,
  errorMessage,
});

export const noTaskGetRoomsList = (encounterId, id, isRoomsClicked) => ({
  type: types.NO_TASKGRID_GET_ROOM_LIST,
  encounterId,
  id,
  isRoomsClicked,
});

