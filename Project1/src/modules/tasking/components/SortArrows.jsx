import PropTypes from 'prop-types';
import React from 'react';
import { isSeqArrowEnabled } from 'srs/redux/tasking/reducers/taskingDetails';

const SortArrows = ({
  task,
  index,
  patientTasks,
  onTaskChangeSequence,
}) => {
  if (index === 0) {
    return (
      <button
        type="button"
        data-auto="arrowDown"
        style={{
          display: isSeqArrowEnabled(task, index, patientTasks) ? 'block' : 'none',
        }}
        onClick={() => onTaskChangeSequence(
          task,
          task.taskSetSequence + 1,
          task.taskSetSequence,
          task.encounterId,
        )}
      >
        <i className="fa fa-arrow-down" aria-hidden="true" />
      </button>
    );
  } else if (index < patientTasks.length - 1) {
    return (
      <span>
        <button
          className="dual-button"
          type="button"
          style={{
            display: isSeqArrowEnabled(task, index, patientTasks) ? 'inline-block' : 'none',
          }}
          data-auto="arrowUp"
          onClick={() => onTaskChangeSequence(
            task,
            task.taskSetSequence - 1,
            task.taskSetSequence,
            task.encounterId,
          )}
        >
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </button>
        <button
          className="dual-button"
          type="button"
          data-auto="arrowDown"
          style={{
            display: isSeqArrowEnabled(task, index, patientTasks, 'down') ? 'inline-block' : 'none',
          }}
          onClick={() => onTaskChangeSequence(
            task,
            task.taskSetSequence + 1,
            task.taskSetSequence,
            task.encounterId,
          )}
        >
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </button>
      </span>
    );
  }
  return (
    <button
      type="button"
      data-auto="arrowUp"
      style={{ display: isSeqArrowEnabled(task, index, patientTasks) ? 'block' : 'none' }}
      onClick={() => onTaskChangeSequence(
        task,
        task.taskSetSequence - 1,
        task.taskSetSequence,
        task.encounterId)}
    >
      <i className="fa fa-arrow-up" aria-hidden="true" />
    </button>
  );
};

SortArrows.propTypes = {
  task: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  patientTasks: PropTypes.arrayOf(PropTypes.shape({
    taskId: PropTypes.number.isRequired,
    taskStatusId: PropTypes.number.isRequired,
    taskStatusDesc: PropTypes.string.isRequired,
    taskDetails: PropTypes.string.isRequired,
    encounterId: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
    personId: PropTypes.number.isRequired,
    birthDate: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    taskSource: PropTypes.string.isRequired,
    lastStateChange: PropTypes.string.isRequired,
  }).isRequired),
  onTaskChangeSequence: PropTypes.func.isRequired,
};

export default SortArrows;
