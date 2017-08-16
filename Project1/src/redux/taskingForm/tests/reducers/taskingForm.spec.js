import taskingForm from '../../reducers/taskingForm';
import deepFreeze from 'deep-freeze';
import * as types from '../../constants/ActionTypes';

const initialState = {
  isVisible: false,
  isExpanded: true,
};

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('tasking form reducer', () => {
  it('should handle initial state', () => {
    expect(
      taskingForm(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle TASKINGFORM_TOGGLE_VISIBLITY', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingForm(state, {
      type: types.TASKINGFORM_TOGGLE_VISIBLITY,
      isVisible: false,
      isExpanded: true,
    })).toEqual({
      ...initialState,
      isVisible: false,
    });
  });

  it('should handle TASKINGFORM_RESIZEMODAL', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingForm(state, {
      type: types.TASKINGFORM_RESIZEMODAL,
      isVisible: false,
      isExpanded: true,
    })).toEqual({
      ...initialState,
      isExpanded: true,
    });
  });

  it('should handle TASKINGFORM_RESETTODEFAULT', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(taskingForm(state, {
      type: types.TASKINGFORM_RESETTODEFAULT,
      isVisible: false,
      isExpanded: true,
    })).toEqual({
      ...initialState,
      isVisible: false,
      isExpanded: true,
    });
  });
});
