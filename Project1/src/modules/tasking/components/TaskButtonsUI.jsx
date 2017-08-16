import PropTypes from 'prop-types';
import React from 'react';
import TaskButton from './TaskButton';
import RoomButton from '../containers/actionButtons/RoomButton';
import { taskStatus } from 'srs/redux/tasking/helpers/helper';
import { unAuthorizeTitleText } from 'srs/redux/tasking/constants/constantTexts';

const TaskButtonsUI = ({
  task,
  isHeldEncounter,
  onTaskStart,
  onTaskComplete,
  onTaskHoldUnHold,
  onTaskCancel,
  canUpdateTasks,
  canDeleteTasks,
}) => {
  const unAuthorizeText = canUpdateTasks ? '' : unAuthorizeTitleText;
  return (
    <div className="btn-group">
      <TaskButton
        disabled={!canUpdateTasks || task.taskStatusId !== taskStatus.Waiting.id}
        onClick={() => onTaskStart(task, taskStatus.InProgress.id)}
        label="Start"
        unAuthorizeText={`Start ${unAuthorizeText}`}
      />
      <TaskButton
        disabled={!canUpdateTasks || task.taskStatusId !== taskStatus.InProgress.id}
        onClick={() => onTaskComplete(task, taskStatus.Completed.id)}
        label="Done"
        unAuthorizeText={`Done ${unAuthorizeText}`}
      />
      <TaskButton
        disabled={!canUpdateTasks ||
                  (task.taskStatusId !== taskStatus.Waiting.id &&
                  task.taskStatusId !== taskStatus.InProgress.id &&
                  task.taskStatusId !== taskStatus.Hold.id)}
        onClick={() => onTaskHoldUnHold(task, task.taskStatusId)}
        label={task.taskStatusId === taskStatus.Hold.id ? 'UnHold' : 'Hold'}
        unAuthorizeText={`Hold ${unAuthorizeText}`}
      />
      <TaskButton
        disabled={(!canUpdateTasks && !canDeleteTasks) ||
                  !canDeleteTasks ||
                  (task.taskStatusId !== taskStatus.Hold.id && isHeldEncounter) ||
                  task.taskStatusId === taskStatus.InProgress.id}
        onClick={() => onTaskCancel(task, taskStatus.Cancelled.id)}
        label="Cancel"
        unAuthorizeText={((canUpdateTasks && canDeleteTasks) || canDeleteTasks) ? '' : `Cancel ${unAuthorizeTitleText}`}
      />
      <RoomButton
        disabled={!canUpdateTasks ||
                  !task.roomId}
        id={task.taskId}
        encounterId={task.encounterId}
        unAuthorizeText={`Room ${unAuthorizeText}`}
        isOnTasking
      />
    </div>
  );
};

TaskButtonsUI.propTypes = {
  task: PropTypes.shape({
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
  }),
  isHeldEncounter: PropTypes.bool,
  onTaskHoldUnHold: PropTypes.func.isRequired,
  onTaskStart: PropTypes.func.isRequired,
  onTaskComplete: PropTypes.func.isRequired,
  onTaskCancel: PropTypes.func.isRequired,
  canDeleteTasks: PropTypes.bool,
  canUpdateTasks: PropTypes.bool,
};

export default TaskButtonsUI;
