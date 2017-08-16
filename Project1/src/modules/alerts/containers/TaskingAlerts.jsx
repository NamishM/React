import { connect } from 'react-redux';
import PatientAlertUI from '../components/PatientAlertUI';
import * as actions from 'srs/redux/patientAlert/actions';

const mapStateToProps = ({
  taskingDetails: {
    selectedTask: {
      personId,
      isAlertExist,
      isVisible,
      isReadOnly,
      isExpanded,
      isTaskingAlert,
      alertDetails,
    },
  },
  routing: {
    isFullScreenMode,
  },
}) => ({
  isAlertExist,
  isVisible,
  isReadOnly,
  isExpanded,
  personId,
  isTaskingAlert,
  alertDetails,
  isFullScreenMode,
});

const mapDispatchToProps = dispatch => ({
  resizeModal: (isExpanded) => {
    dispatch(actions.resizeModal(isExpanded));
  },
  resetToDefault: () => {
    dispatch(actions.resetToDefault());
  },
  changeAlertDetails: (alertText, isPrivate) => {
    dispatch(actions.changeAlertDetails(alertText, isPrivate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientAlertUI);
