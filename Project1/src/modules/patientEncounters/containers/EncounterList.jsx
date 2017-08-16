import { connect } from 'react-redux';
import Appointments from '../components/Encounters';
import { getNextPage, sortColumn } from 'srs/redux/encounters/actions';
import { push } from 'react-router-redux';
import { getDenormalizedAppointments, getSortOrder }
  from 'srs/redux/encounters/reducers/encounters';

const mapStateToProps = state => ({
  personId: state.selectedChart.personId,
  appointments: getDenormalizedAppointments(state),
  isInfiniteLoading: state.appointments.isInfiniteLoading,
  sortColumns: getSortOrder(state),
  width: state.browser.width, // Hook in so we repaint on resize
  height: state.browser.height, // Hook in so we repaint on resize
});


const mapDispatchToProps = dispatch => ({
  onRowClick: (personId, encounterId) => {
    dispatch(push({
      pathname: '/patientEncounter',
      query: {
        personId,
        encounterId,
      },
    }));
  },
  onSortChanged: column =>
    dispatch(sortColumn(column)),
  onInfiniteLoad: () =>
    dispatch(getNextPage()),
});

const EncounterList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointments);

export default EncounterList;
