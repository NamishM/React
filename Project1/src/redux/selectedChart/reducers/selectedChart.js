import * as types from '../constants/ActionTypes';

const selectedChart = (state = {
  personId: null,
  selectedName: null,
  chart: null,
  encounterId: null,
  encounter: null,
  prevSearch: '',
  prevPathname: 'desktop/appointment',
}, action) => {
  switch (action.type) {
    case types.SELECTED_CHART_SET_PREV_ROUTE:
      return {
        ...state,
        prevPathname: action.pathname || 'desktop/appointment',
        prevSearch: action.search || '',
      };
    case types.SELECTED_CHART_CLEAR:
      return {
        ...state,
        personId: null,
        selectedName: null,
        chart: null,
        encounterId: null,
        encounter: null,
      };
    case types.SELECTED_CHART_ENCOUNTER_SELECTED:
      return {
        ...state,
        personId: action.personId,
        encounterId: action.encounterId,
      };
    case types.SELECTED_CHART_SELECTED:
      return {
        ...state,
        personId: action.personId,
        encounterId: state.personId !== action.personId ? '{00000000-0000-0000-0000-000000000000}' : state.encounterId,
      };
    case types.SELECTED_CHART_SET_CHART:
      return {
        ...state,
        chart: action.chart,
        personId: action.chart ? action.chart.personId : null,
      };
    case types.SELECTED_CHART_SET_ENCOUNTER:
      return {
        ...state,
        encounter: action.encounter,
        encounterId: action.encounter ? action.encounter.encounterId : '{00000000-0000-0000-0000-000000000000}',
      };
    default:
      return state;
  }
};

export const getSelectedChartInfo = ({
  selectedChart: {
    personId,
    encounterId,
  },
}) => ({
  currentPersonId: personId,
  currentEncounterId: encounterId,
});

export default selectedChart;
