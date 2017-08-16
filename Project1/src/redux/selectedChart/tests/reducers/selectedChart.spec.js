
import selectedChart from '../../reducers/selectedChart';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const state = {
  personId: null,
  selectedName: null,
  chart: null,
  encounterId: null,
  encounter: null,
  prevSearch: '',
  prevPathname: 'desktop/appointment',
};

describe('selectedChart reducer', () => {
  it('should handle initial state', () => {
    expect(
      selectedChart(undefined, {}),
    ).toEqual(state);
  });

  it('should handle SELECTED_CHART_SET_PREV_ROUTE', () => {
    expect(selectedChart(state, {
      type: 'SELECTED_CHART_SET_PREV_ROUTE',
      pathname: 'desktop',
      search: '?foo=foo',
    })).toEqual({
      ...state,
      prevPathname: 'desktop',
      prevSearch: '?foo=foo',
    });
  });

  it('should handle SELECTED_CHART_CLEAR', () => {
    expect(selectedChart({
      ...state,
      chart: {},
      personId: 2,
    }, {
      type: 'SELECTED_CHART_CLEAR',
    })).toEqual(state);
  });

  it('should handle SELECTED_CHART_ENCOUNTER_SELECTED', () => {
    expect(selectedChart(state, {
      type: 'SELECTED_CHART_ENCOUNTER_SELECTED',
      encounterId: 1,
      personId: 2,
    })).toEqual({
      ...state,
      encounterId: 1,
      personId: 2,
    });
  });

  it('should handle SELECTED_CHART_SELECTED', () => {
    expect(selectedChart(state, {
      type: 'SELECTED_CHART_SELECTED',
      personId: 2,
    })).toEqual({
      ...state,
      encounterId: '{00000000-0000-0000-0000-000000000000}',
      personId: 2,
    });
  });

  it('should handle SELECTED_CHART_SET_CHART', () => {
    expect(selectedChart(state, {
      type: 'SELECTED_CHART_SET_CHART',
      chart: { personId: 1 },
    })).toEqual({
      ...state,
      chart: { personId: 1 },
      personId: 1,
    });
  });

  it('should handle SELECTED_CHART_SET_ENCOUNTER', () => {
    expect(selectedChart(state, {
      type: 'SELECTED_CHART_SET_ENCOUNTER',
      encounter: { encounterId: 1 },
    })).toEqual({
      ...state,
      encounter: { encounterId: 1 },
      encounterId: 1,
    });
  });
});
