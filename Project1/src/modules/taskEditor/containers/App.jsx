import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TaskEditor from '../../tasking/containers/TaskEditor';
import PatientTrackingStatus from '../../tasking/components/PatientTrackingStatus';
import TaskRow from '../../tasking/components/TaskRow';
import {
  getDenormalizedPatientTaskingDetails,
} from 'srs/redux/tasking/reducers/taskingDetails';
// TODO: Get rid of all less files
import 'srs/modules/tasking/css/Tasking.less';
import 'react-bootstrap-multiselect/less/bootstrap-multiselect.less';
import format from 'date-fns/format';

import * as actions from 'srs/redux/tasking/actions/taskingActions';

const getUpdatedTask = (task, taskStatusId, taskSetSequence) => ({
  ...task,
  taskStatusId,
  taskSetSequence,
});

const App = ({
  taskingDetailList,
  actionsDisabled,
  desktopLayout,
  encounterTime,
  onTaskChangeSequence,
  onTaskAlertClick,
  onTaskSave,
  encounterId,
  taskingSettings,
}) => (
  <div className="mainApp">
    <div className="taskGrids overlay">
      <PatientTrackingStatus
        key={1}
        patientTrackingId={1}
        patientTrackingDesc={`Tasks for: ${format(encounterTime, 'MM/DD/YYYY hh:mm A')}`}
        patientTrackingColor="100,100,0"
        lenOfGroup={1}
        patientTrackingStatusTaskListLength={taskingDetailList.length}
        index={0}
        desktopLayout={desktopLayout}
      >
        {
          taskingDetailList.filter(x => x.taskStatusId !== 4 && x.taskStatusId !== 6)
            .map((task) => {
              const isHeldEncounter = taskingDetailList.filter(
                x => x.encounterId === task.encounterId && x.taskStatusId === 5).length > 0;
              return (
                <TaskRow
                  key={task.taskId}
                  task={task}
                  desktopLayout={desktopLayout}
                  nestedTask={taskingDetailList}
                  onTaskChangeSequence={onTaskChangeSequence}
                  onTaskSave={onTaskSave}
                  isHeldEncounter={isHeldEncounter}
                  actionsDisabled={actionsDisabled}
                  taskingSettings={taskingSettings}
                  onTaskAlertClick={onTaskAlertClick}
                />
              );
            })
        }
        {taskingDetailList.length === 0 && desktopLayout === false ? 'No Task Available' : null}
        {encounterId ?
          <tbody>
            <tr className="taskEditor">
              <td
                style={{
                  borderLeft: '1px solid #ccc',
                  padding: 0,
                }}
                colSpan="8"
              >
                <TaskEditor
                  onClick={onTaskSave}
                  encounterId={encounterId}
                />
              </td>
            </tr>
          </tbody> : null
        }
      </PatientTrackingStatus>
    </div>
  </div>
);

App.propTypes = {
  taskingDetailList: PropTypes.arrayOf(PropTypes.shape({
    taskId: PropTypes.number.isRequired,
    taskStatusId: PropTypes.number.isRequired,
    taskStatusDesc: PropTypes.string.isRequired,
    taskDetails: PropTypes.string,
    encounterId: PropTypes.string.isRequired,
    lastStateChange: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
    personId: PropTypes.number.isRequired,
    birthDate: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    taskSource: PropTypes.string.isRequired,
  }).isRequired),
  actionsDisabled: PropTypes.bool.isRequired,
  desktopLayout: PropTypes.bool.isRequired,
  isNoTaskGridVisible: PropTypes.bool,
  onTaskChangeSequence: PropTypes.func.isRequired,
  onTaskSave: PropTypes.func.isRequired,
  encounterId: PropTypes.string.isRequired,
  encounterTime: PropTypes.string,
  taskingSettings: PropTypes.oneOfType([PropTypes.object]),
  onTaskAlertClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  taskingDetailList: getDenormalizedPatientTaskingDetails(state),
  actionsDisabled: state.taskingDetails.actionsDisabled,
  desktopLayout: state.browser.screenLayout === 'desktop',
  encounterId: state.selectedChart.encounterId,
  encounterTime: state.selectedChart.encounter ?
    state.selectedChart.encounter.personDeskDate : null,
  taskingSettings: state.settings.users.tasking,
});

const mapDispatchToProps = dispatch => ({
  onTaskChangeSequence: (task, updatedSequence, actualSequence, encounterId) =>
    dispatch(actions.taskChangeSequence(
      getUpdatedTask(task, task.taskStatusId, updatedSequence),
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
  onTaskAlertClick: (task, selectedIcon) =>
    dispatch(actions.onTaskAlertClick(task, selectedIcon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
