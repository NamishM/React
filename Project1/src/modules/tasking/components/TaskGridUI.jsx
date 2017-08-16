import PropTypes from 'prop-types';
import React from 'react';
import PatientTrackingStatus from './PatientTrackingStatus';
import TaskRow from './TaskRow';

const TaskGridUI = ({
  taskingDetailList,
  patientTrackingStatusList,
  actionsDisabled,
  isNoTaskGridVisible,
  desktopLayout,
  isFullScreenMode = false,
  onTaskChangeSequence,
  onTaskSave,
  onTaskExpand = () => {},
  onClickPatientName,
  onTaskAlertClick,
  taskingSettings,
}) => (
  <div className={isNoTaskGridVisible ? 'container-hidden' : 'container-visible'}>
    {(patientTrackingStatusList.length === 0) ?
      <div className="groupTasks" data-auto="noTaskMsg">
        <h4 className="text-info">
          <br />
          Please select at least one group to see tasks
        </h4>
      </div> :
      patientTrackingStatusList.map((patientTrackingStatus, index) => {
        const patientTrackingStatusTaskList = taskingDetailList.filter(
          x => x.patientStatusTypeId === patientTrackingStatus.value &&
                  x.taskStatusId !== 4 && x.taskStatusId !== 6);
        return (
          <PatientTrackingStatus
            key={patientTrackingStatus.value}
            patientTrackingId={patientTrackingStatus.value}
            patientTrackingDesc={patientTrackingStatus.label}
            patientTrackingColor={patientTrackingStatus.color}
            patientTrackingStatusTaskListLength={patientTrackingStatusTaskList.length}
            lenOfGroup={patientTrackingStatusList.length}
            index={index}
            desktopLayout={desktopLayout}
          >
            {
              patientTrackingStatusTaskList.map((task) => {
                const isHeldEncounter = taskingDetailList.filter(
                  x => x.encounterId === task.encounterId && x.taskStatusId === 5 &&
                  x.taskStatusId !== 4 && x.taskStatusId !== 6).length > 0;
                return (
                  <TaskRow
                    key={task.taskId}
                    task={task}
                    desktopLayout={desktopLayout}
                    nestedTask={task.children}
                    onTaskChangeSequence={onTaskChangeSequence}
                    onTaskSave={onTaskSave}
                    onTaskExpand={onTaskExpand}
                    isHeldEncounter={isHeldEncounter}
                    actionsDisabled={actionsDisabled}
                    onClickPatientName={() =>
                      onClickPatientName(task.encounterId, task.personId, isFullScreenMode)}
                    showEditor
                    onTaskAlertClick={onTaskAlertClick}
                    taskingSettings={taskingSettings}
                  />
                );
              })
            }
            {patientTrackingStatusTaskList.length === 0 && desktopLayout === false ? 'No Task Available' : null}
          </PatientTrackingStatus>
        );
      })
    }
  </div>
);

const taskType = {
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
  roomId: PropTypes.number,
};

TaskGridUI.propTypes = {
  taskingDetailList: PropTypes.arrayOf(PropTypes.shape({
    ...taskType,
    children: PropTypes.arrayOf(PropTypes.shape(taskType)),
  }).isRequired),
  patientTrackingStatusList: PropTypes.arrayOf(PropTypes.shape({
    roomDescription: PropTypes.string,
    status: PropTypes.string,
    duration: PropTypes.string,
    color: PropTypes.string,
  }).isRequired),
  actionsDisabled: PropTypes.bool.isRequired,
  desktopLayout: PropTypes.bool.isRequired,
  isFullScreenMode: PropTypes.bool.isRequired,
  isNoTaskGridVisible: PropTypes.bool,
  onTaskChangeSequence: PropTypes.func.isRequired,
  onTaskSave: PropTypes.func.isRequired,
  onTaskExpand: PropTypes.func.isRequired,
  onClickPatientName: PropTypes.func.isRequired,
  onTaskAlertClick: PropTypes.func.isRequired,
  taskingSettings: PropTypes.oneOfType([PropTypes.object]),
};

export default TaskGridUI;
