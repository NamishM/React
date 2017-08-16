import * as types from '../constants/ActionTypes';
import getTime from 'date-fns/get_time';

export const onIdle = timeSinceLastAction => ({
  type: types.IDLE_INACTIVE,
  timeSinceLastAction,
  statusChanged: getTime(new Date()),
});

export const onActive = () => ({
  type: types.IDLE_ACTIVE,
  statusChanged: getTime(new Date()),
});

export const onActiveSilent = () => ({
  type: types.IDLE_ACTIVE_SILENT,
  statusChanged: getTime(new Date()),
});
