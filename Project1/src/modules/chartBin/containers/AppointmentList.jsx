import { connect } from 'react-redux';
import Appointments from '../components/Appointments';
import { getNextPage, sortColumn } from 'srs/redux/appointmentList/actions';
import { push } from 'react-router-redux';
import { getDenormalizedAppointments, getSortOrder }
  from 'srs/redux/appointmentList/reducers/appointments';

const mapStateToProps = state => ({
  appointments: getDenormalizedAppointments(state),
  isInfiniteLoading: state.appointments.isInfiniteLoading,
  sortColumns: getSortOrder(state),
  width: state.browser.width, // Hook in so we repaint on resize
  height: state.browser.height, // Hook in so we repaint on resize
  previousPath: state.routing.previousPath, // "document"
  selectedTabId: state.documentTabs.selectedTabId,
  isFilterBoardVisible: state.chartBinFilter.isFilterBoardVisible,
});

const mapDispatchToProps = dispatch => ({
  onRowClick: (personId, encounterId, previousPath, documentGroupId) => {
    // dispatch(chartSelected(id));
    // Checking previousPath to maintain the context
    if (previousPath === 'document') {
      dispatch(push({
        pathname: '/document',
        query: {
          documentGroupId,
          encounterId,
          personId,
        },
      }));
    } else {
      dispatch(push({
        pathname: '/patientEncounter',
        query: {
          personId,
          encounterId,
        },
      }));
    }
  },
  onSortChanged: column =>
    dispatch(sortColumn(column)),
  onInfiniteLoad: () =>
    dispatch(getNextPage()),
});

const AppointmentList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointments);

export default AppointmentList;
