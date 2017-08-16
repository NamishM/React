import { connect } from 'react-redux';
import PatientAlertUI from '../components/PatientAlertUI';
import * as actions from 'srs/redux/patientAlert/actions';
import { filterJoin } from 'srs/common/utilities';

const mapStateToProps = ({
  patientAlertExtension: {
    isPrivate,
    isAlertExist,
    alert,
    isVisible,
    isReadOnly,
    isExpanded,
  },
  selectedChart: {
    chart,
    personId,
  },
}) => ({
  isPrivate,
  isAlertExist,
  alertMessage: alert,
  isVisible,
  isReadOnly,
  isExpanded,
  personId,
  alertDetails: {
    titleText: chart ? filterJoin(', ', chart.lastName, chart.firstName) : null,
    alertMessage: alert,
  },
});

const mapDispatchToProps = dispatch => ({
  changeAlertDetails: (alertText, isPrivate) => {
    dispatch(actions.changeAlertDetails(alertText, isPrivate));
  },
  toggleVisiblity: (isVisible) => {
    dispatch(actions.toggleVisiblity(isVisible));
  },
  toggleEditMode: (isReadOnly) => {
    dispatch(actions.toggleEditMode(isReadOnly));
  },
  resetToDefault: () => {
    dispatch(actions.resetToDefault());
  },
  patientAlertSaveUpdate: (alertText, isPrivate, personId) => {
    dispatch(actions.patientAlertSaveUpdate(alertText, isPrivate, personId));
  },
  patientAlertDelete: (personId) => {
    dispatch(actions.patientAlertDelete(personId));
  },
  resizeModal: () => {
    dispatch(actions.resizeModal());
  },
});

const PatientAlert = connect(mapStateToProps, mapDispatchToProps)(PatientAlertUI);

export default PatientAlert;
