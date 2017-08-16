
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('tasking form action', () => {
  it('toggleVisiblity should create TASKINGFORM_TOGGLE_VISIBLITY action', () => {
    expect(actions.toggleVisiblity(false)).toEqual({
      type: types.TASKINGFORM_TOGGLE_VISIBLITY,
      isVisible: false,
    });
  });

  it('resetToDefault should create TASKINGFORM_RESETTODEFAULT action', () => {
    expect(actions.resetToDefault()).toEqual({
      type: types.TASKINGFORM_RESETTODEFAULT,
    });
  });

  it('resizeModal should create TASKINGFORM_RESIZEMODAL action', () => {
    expect(actions.resizeModal(false)).toEqual({
      type: types.TASKINGFORM_RESIZEMODAL,
      isExpanded: false,
    });
  });
});
