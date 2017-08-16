import { connect } from 'react-redux';
import TaskButtonsUI from '../components/TaskButtonsUI';
import { taskStatus } from 'srs/redux/tasking/helpers/helper';
import {
  taskStart,
  taskUnHold,
  taskHold,
  taskComplete,
  taskCancel,
} from 'srs/redux/tasking/actions/taskingActions';

const getUpdatedTask = (task, taskStatusId, taskSetSequence) => ({
  ...task,
  taskStatusId,
  taskSetSequence,
});

const mapStateToProps = (state, { task, isHeldEncounter }) => ({
  task,
  isHeldEncounter,
});

const mapDispatchToProps = dispatch => ({
  onTaskStart: (task, taskStatusId) =>
    dispatch(taskStart(getUpdatedTask(
      task,
      taskStatusId,
      task.taskSetSequence,
    ))),
  onTaskComplete: (task, taskStatusId) =>
    dispatch(taskComplete(getUpdatedTask(
      task,
      taskStatusId,
      task.taskSetSequence,
    ))),
  onTaskHoldUnHold: (task, taskStatusId) => {
    if (taskStatusId === taskStatus.Hold.id) {
      dispatch(taskUnHold(getUpdatedTask(
        task,
        taskStatus.Queued.id,
        task.taskSetSequence,
      )));
    } else {
      dispatch(taskHold(getUpdatedTask(
        task,
        taskStatus.Hold.id,
        task.taskSetSequence,
      )));
    }
  },
  onTaskCancel: (task, taskStatusId) =>
    dispatch(taskCancel(getUpdatedTask(
      task,
      taskStatusId,
      task.taskSetSequence,
    ))),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskButtonsUI);
