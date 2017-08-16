import { connect } from 'react-redux';
import TaskGridUI from '../components/TaskGridUI';
import * as actions from 'srs/redux/tasking/actions/taskingActions';
import {
  getDenormalizedTaskingDetails,
  getPatientTrackingStatuses,
} from 'srs/redux/tasking/reducers/taskingDetails';
import { push } from 'react-router-redux';

const getUpdatedTask = (task, taskStatusId, taskSetSequence) => ({
  ...task,
  taskStatusId,
  taskSetSequence,
});

const mapStateToProps = state => ({
  taskingDetailList: getDenormalizedTaskingDetails(state),
  patientTrackingStatusList: getPatientTrackingStatuses(state),
  actionsDisabled: state.taskingDetails.actionsDisabled,
  isNoTaskGridVisible: state.nestedTaskReducer.isNoTaskGridVisible,
  desktopLayout: state.browser.screenLayout === 'desktop',
  isFullScreenMode: state.routing.isFullScreenMode,
  taskingSettings: state.settings.users.tasking,
});
const mapDispatchToProps = dispatch =>
  ({
    onTaskChangeSequence: (task, updatedSequence, actualSequence, encounterId) =>
      dispatch(actions.taskChangeSequence(
        getUpdatedTask(
          task,
          task.taskStatusId,
          updatedSequence,
        ),
        actualSequence,
        encounterId,
      )),
    onTaskSave: ({
      value,
      selections,
      encounterId,
    }) => selections.map(x => dispatch(actions.taskSaveRequested({
      patientStatusTypeId: x,
      taskDetails: value,
      encounterId,
    }))),
    onTaskExpand: encounterId =>
      dispatch(actions.fetchingTasksForEncounter(encounterId)),
    onClickPatientName: (encounterId, personId, isFullScreenMode) => {
      if (isFullScreenMode) {
        window.location.href =
            `xlink://TASKING_PATIENT_SELECT?personId=${personId}&encounterId=${encounterId}`;
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
    onTaskAlertClick: (task, selectedIcon) =>
      dispatch(actions.onTaskAlertClick(task, selectedIcon)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(TaskGridUI);
