
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('idle action', () => {
  it(`onIdle should create ${types.IDLE_INACTIVE} action`, () => {
    const action = actions.onIdle();
    expect({
      type: action.type,
    }).toEqual({
      type: types.IDLE_INACTIVE,
    });
  });

  it(`onActive should create ${types.IDLE_ACTIVE} action`, () => {
    const action = actions.onActive();
    expect({
      type: action.type,
    }).toEqual({
      type: types.IDLE_ACTIVE,
    });
  });

  it(`onActiveSilent should create ${types.IDLE_ACTIVE_SILENT} action`, () => {
    const action = actions.onActiveSilent();
    expect({
      type: action.type,
    }).toEqual({
      type: types.IDLE_ACTIVE_SILENT,
    });
  });
});
