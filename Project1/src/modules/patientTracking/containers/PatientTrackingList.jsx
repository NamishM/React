import { connect } from 'react-redux';
import PatientTrackings from '../components/PatientTrackings';
import { getNextPage, sortColumn } from 'srs/redux/patientTracking/actions';
import { getDenormalizedPatientTrackings, getSortOrder }
  from 'srs/redux/patientTracking/reducers/patientTracking';

const mapStateToProps = state => ({
  patientTrackings: getDenormalizedPatientTrackings(state),
  isInfiniteLoading: state.appointments.isInfiniteLoading,
  sortColumns: getSortOrder(state),
  width: state.browser.width, // Hook in so we repaint on resize
  height: state.browser.height, // Hook in so we repaint on resize
  elementHeight: state.browser.screenLayout === 'device' ? 169 : 28, // eslint-disable-line no-nested-ternary
});

const mapDispatchToProps = dispatch => ({
  onSortChanged: column =>
    dispatch(sortColumn(column)),
  onInfiniteLoad: () =>
    dispatch(getNextPage()),
});

const PatientTrackingList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientTrackings);

export default PatientTrackingList;
