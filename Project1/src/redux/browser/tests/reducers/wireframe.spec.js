
import wireframe from '../../reducers/wireframe';
import deepFreeze from 'deep-freeze';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../../user/constants/ActionTypes';


const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  desktopVisiblePanel: 'both',
  deviceVisiblePanel: 'left',
  leftArea: '',
  mainArea: '',
};

describe('wireframe reducer', () => {
  it('should handle initial state', () => {
    expect(wireframe(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN - Make Fullscreen', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'left',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: 'WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN',
    })).toEqual({
      desktopVisiblePanel: 'right',
      deviceVisiblePanel: 'left',
    });
  });

  it('should handle WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN - Show both panels', () => {
    const state = {
      desktopVisiblePanel: 'right',
      deviceVisiblePanel: 'left',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: 'WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN',
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'left',
    });
  });

  it('should handle WIREFRAME_SMALL_TOGGLE_PANELS - Left to Right', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'left',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: 'WIREFRAME_SMALL_TOGGLE_PANELS',
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
    });
  });

  it('should handle WIREFRAME_SMALL_TOGGLE_PANELS - Right to Left', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: 'WIREFRAME_SMALL_TOGGLE_PANELS',
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'left',
    });
  });

  it('should handle WIREFRAME_VIEW_LEFT', () => {
    const state = {
      deviceVisiblePanel: 'right',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: 'WIREFRAME_VIEW_LEFT',
    })).toEqual({
      deviceVisiblePanel: 'left',
    });
  });

  it('should handle WIREFRAME_VIEW_RIGHT', () => {
    const state = {
      deviceVisiblePanel: 'left',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: 'WIREFRAME_VIEW_RIGHT',
    })).toEqual({
      deviceVisiblePanel: 'right',
    });
  });

  it('should handle @@router/LOCATION_CHANGE desktop/appointment', () => {
    const state = {
      ...initialState,
      deviceVisiblePanel: 'right',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'desktop/appointment',
      },
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: 'appointment',
      mainArea: 'desktop',
    });
  });

  it('should handle @@router/LOCATION_CHANGE ', () => {
    const state = {
      ...initialState,
      deviceVisiblePanel: 'right',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '',
      },
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: '',
      mainArea: '',
    });
  });


  it('should handle @@router/LOCATION_CHANGE desktop/chart', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: '',
      mainArea: '',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'desktop/chart',
      },
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: 'chart',
      mainArea: 'desktop',
    });
  });

  it('should handle @@router/LOCATION_CHANGE tasking/appointment', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: '',
      mainArea: '',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'tasking/appointment',
      },
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: 'appointment',
      mainArea: 'tasking',
    });
  });

  it('should handle @@router/LOCATION_CHANGE tasking/chart', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: '',
      mainArea: '',
    };
    deepFreeze(state);

    expect(wireframe(state, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'tasking/chart',
      },
    })).toEqual({
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'right',
      leftArea: 'chart',
      mainArea: 'tasking',
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    expect(wireframe(initialState, {
      type: LOGOUT_REQUESTED,
    })).toEqual(initialState);
  });

  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(wireframe(initialState, {
      type: LOGOUT_SESSION_REMOTE_ENDED,
    })).toEqual(initialState);
  });
});
