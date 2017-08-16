
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('wireframe actions', () => {
  it('desktopToggleFullscreen() should create WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN action', () => {
    expect(actions.desktopToggleFullscreen()).toEqual({
      type: 'WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN',
    });
  });

  it('smallTogglePanels() should create WIREFRAME_SMALL_TOGGLE_PANELS action', () => {
    expect(actions.smallTogglePanels()).toEqual({
      type: 'WIREFRAME_SMALL_TOGGLE_PANELS',
    });
  });

  it('smallViewLeft() should create WIREFRAME_VIEW_LEFT action', () => {
    expect(actions.smallViewLeft()).toEqual({
      type: 'WIREFRAME_VIEW_LEFT',
    });
  });

  it('smallViewRight() should create WIREFRAME_VIEW_RIGHT action', () => {
    expect(actions.smallViewRight()).toEqual({
      type: 'WIREFRAME_VIEW_RIGHT',
    });
  });
});
