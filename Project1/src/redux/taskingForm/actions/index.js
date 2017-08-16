import * as types from '../constants/ActionTypes';

export const toggleVisiblity = isVisible => ({
  type: types.TASKINGFORM_TOGGLE_VISIBLITY,
  isVisible,
});

export const resetToDefault = () => ({
  type: types.TASKINGFORM_RESETTODEFAULT,
});


export const resizeModal = isExpanded => ({
  type: types.TASKINGFORM_RESIZEMODAL,
  isExpanded,
});
