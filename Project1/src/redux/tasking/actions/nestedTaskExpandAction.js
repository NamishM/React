import * as types from '../constants/ActionTypes';

export const toggleVisiblity = () => ({
  type: types.NESTEDTASK_TOGGLE_VISIBLITY,
});

export const noTaskGridToggle = () => ({
  type: types.NOTASKGRID_TOGGLE_VISIBLITY,
});
