
import { idle } from '../../reducers';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import getTime from 'date-fns/get_time';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const time = getTime(new Date());
const initialState = {
  isIdle: true,
  statusChanged: null,
};
deepFreeze(initialState);

describe('idle reducer', () => {
  it('should handle initial state', () => {
    expect(
      idle(undefined, {}),
    ).toEqual(initialState);
  });

  it(`should handle ${types.IDLE_ACTIVE}`, () => {
    expect(
      idle(initialState, {
        type: types.IDLE_ACTIVE,
        statusChanged: time,
      }),
    ).toEqual({
      isIdle: false,
      statusChanged: time,
    });
  });

  it(`should handle ${types.IDLE_ACTIVE_SILENT}`, () => {
    expect(
      idle(initialState, {
        type: types.IDLE_ACTIVE_SILENT,
        statusChanged: time,
      }),
    ).toEqual({
      isIdle: false,
      statusChanged: time,
    });
  });

  it(`should handle ${types.IDLE_INACTIVE}`, () => {
    expect(
      idle(initialState, {
        type: types.IDLE_INACTIVE,
        statusChanged: time,
      }),
    ).toEqual({
      isIdle: true,
      statusChanged: time,
    });
  });
});
