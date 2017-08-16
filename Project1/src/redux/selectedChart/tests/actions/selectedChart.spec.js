
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('selectedChart action', () => {
  it('clearSelectedChart should create SELECTED_CHART_CLEAR', () => {
    expect(actions.clearSelectedChart()).toEqual({
      type: types.SELECTED_CHART_CLEAR,
    });
  });

  it('setPreviousRoute should create SELECTED_CHART_SET_PREV_ROUTE', () => {
    expect(actions.setPreviousRoute('path', 'search')).toEqual({
      type: types.SELECTED_CHART_SET_PREV_ROUTE,
      pathname: 'path',
      search: 'search',
    });
  });

  it('chartSelected should create SELECTED_CHART_SELECTED', () => {
    expect(actions.chartSelected(1)).toEqual({
      type: types.SELECTED_CHART_SELECTED,
      personId: 1,
    });
  });

  it('encounterSelected should create SELECTED_CHART_ENCOUNTER_SELECTED', () => {
    expect(actions.encounterSelected(1, 2)).toEqual({
      type: types.SELECTED_CHART_ENCOUNTER_SELECTED,
      personId: 1,
      encounterId: 2,
    });
  });

  it('setChart should create SELECTED_CHART_SET_CHART', () => {
    expect(actions.setChart({ personId: 1 })).toEqual({
      type: types.SELECTED_CHART_SET_CHART,
      chart: { personId: 1 },
    });
  });

  it('setEncounter should create SELECTED_CHART_SET_ENCOUNTER', () => {
    expect(actions.setEncounter({ encounterId: 1 })).toEqual({
      type: types.SELECTED_CHART_SET_ENCOUNTER,
      encounter: { encounterId: 1 },
    });
  });
});
