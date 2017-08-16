import { connect } from 'react-redux';
import Encounters from '../components/Encounters';
import {
  checkOutPatientRequested,
  getNextPage,
} from 'srs/redux/noTaskGrid/actions';
import { noTaskGridToggle }
  from 'srs/redux/tasking/actions/nestedTaskExpandAction';
import '../css/encounters.less';
import { getDenormalizedNoTaskGridData }
  from 'srs/redux/noTaskGrid/reducers/noTaskGrid';

const mapStateToProps = state => ({
  encounters: getDenormalizedNoTaskGridData(state).filter(
    x => !x.isTaskAvailable && x.checkOutTime === null),
  isInfiniteLoading: state.appointments.isInfiniteLoading,
  width: state.browser.width, // Hook in so we repaint on resize
  height: state.browser.height, // Hook in so we repaint on resize
  elementHeight: state.browser.screenLayout === 'device' ? 169 : 25, // eslint-disable-line no-nested-ternary
  isNoTaskGridVisible: state.nestedTaskReducer.isNoTaskGridVisible,
  screenLayout: state.browser.screenLayout,
});

const EncountersList = connect(
  mapStateToProps,
  {
    onInfiniteLoad: getNextPage,
    onNoTaskGridToggle: noTaskGridToggle,
    onClickCheckOutButton: checkOutPatientRequested,
  },
)(Encounters);

export default EncountersList;
