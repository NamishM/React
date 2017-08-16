import { connect } from 'react-redux';
import Patients from '../components/Patients';
import { sortColumn, getNextPatientData } from 'srs/redux/patients/actions';
// import { chartSelected } from 'srs/redux/selectedChart/actions';
import {
  push,
  // goBack,
} from 'react-router-redux';
import { getDenormalizedPatients, getSortOrder }
  from 'srs/redux/patients/reducers/patientSearchData';

const mapStateToProps = state => ({
  patients: getDenormalizedPatients(state),
  isInfiniteLoading: state.patientSearchData.isInfiniteLoading,
  hasAdvanceSearch: state.patientSearchData.hasAdvanceSearch,
  islastPageArrived: state.patientSearchData.islastPageArrived,
  sortColumns: getSortOrder(state),
  previousPath: state.routing.previousPath, // "document"
  selectedTabId: state.documentTabs.selectedTabId,
});

const mapDispatchToProps = dispatch => ({
  onRowClick: (personId, previousPath, documentGroupId) => {
    // Checking previousPath to maintain the context
    if (previousPath === 'document') {
      dispatch(push({
        pathname: '/document',
        query: {
          documentGroupId,
          personId,
        },
      }));
    } else {
      dispatch(push({
        pathname: '/patientEncounter',
        query: {
          personId,
        },
      }));
    }
  },
  sortColumn: (column) => {
    dispatch(sortColumn(column));
  },
  handleInfiniteLoad: (skipNextPageFlow) => {
    if (!skipNextPageFlow) {
      dispatch(getNextPatientData());
    }
  },
});

const PatientList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Patients);

export default PatientList;
