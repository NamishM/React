
import browserStateExtension from '../../reducers/browserStateExtension';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('redux-responsive - reducer extension for Anywhere', () => {
  it('should handle initial state', () => {
    expect(
      browserStateExtension(undefined, {}),
    ).toEqual({});
  });

  it('should handle resize across device threshold - medium', () => {
    const state = {
      mediaType: 'medium',
    };
    deepFreeze(state);

    const newState = browserStateExtension(state, {
      type: 'redux-responsive/CALCULATE_RESPONSIVE_STATE',
    });

    expect(newState).toEqual({
      mediaType: 'medium',
      screenLayout: 'desktop',
    });
  });

  it('should handle resize across device threshold - small', () => {
    const state = {
      mediaType: 'small',
    };
    deepFreeze(state);

    const newState = browserStateExtension(state, {
      type: 'redux-responsive/CALCULATE_RESPONSIVE_STATE',
    });

    expect(newState).toEqual({
      mediaType: 'small',
      screenLayout: 'device',
    });
  });
});
