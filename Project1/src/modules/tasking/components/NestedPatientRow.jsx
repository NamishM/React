import PropTypes from 'prop-types';
import React from 'react';
import { taskStatus } from 'srs/redux/tasking/helpers/helper';
import TaskEditor from '../containers/TaskEditor';
import SortArrows from './SortArrows';

const getCssClass = (taskStatusDesc) => {
  switch (taskStatusDesc) {
    case taskStatus.Completed.desc:
      return 'nestedRow nestedTaskComplete';
    case taskStatus.Cancelled.desc:
      return 'nestedRow nestedTaskComplete';
    case taskStatus.Waiting.desc:
      return 'nestedRow';
    case taskStatus.InProgress.desc:
      return 'nestedRow nestedTaskWaiting';
    default:
      return 'nestedRow';
  }
};

const NestedPatientRow = ({
  patientTasks,
  onTaskChangeSequence,
  onTaskSave,
  showEditor = false,
  parentEncounterId = null,
  desktopLayout,
  actionsDisabled = false,
}) => (
  <table>
    <thead>
      <tr>
        <th className="nested-room">Room</th>
        <th className="nested-taskDetails">Task Details</th>
        <th className="nested-status">Status</th>
        <th className="nested-lastAction" />
        <th className="nested-sorter" />
      </tr>
    </thead>
    <tbody>
      {
        patientTasks.map((task, index) => (
          <tr
            className={getCssClass(task.taskStatusDesc)}
            style={{ borderColor: task.color }}
            key={task.taskId}
          >
            <td className="nested-room" style={{ backgroundColor: task.color }}>
              {task.roomDescription ? task.roomDescription : '\u00a0'}
            </td>
            <td className="nested-taskDetails">
              {task.taskDetails ? task.taskDetails : '\u00a0'}
            </td>
            <td className="nested-status">
              {task.taskStatusDesc ? task.taskStatusDesc : '\u00a0'}
            </td>
            <td className="nested-lastAction">
              {desktopLayout === false ? 'Last Update: ' : null}{task.lastStateChange}
            </td>
            <td
              className="nested-sorter"
              style={actionsDisabled ? {
                pointerEvents: 'none',
                tabIndex: -1,
                opacity: 0.5,
              } : {}}
            >
              { patientTasks.length > 1 ?
                <SortArrows
                  task={task}
                  index={index}
                  onTaskChangeSequence={onTaskChangeSequence}
                  patientTasks={patientTasks}
                /> : null
              }
            </td>
          </tr>
        ))
      }
      {showEditor ?
        <tr className="taskEditor">
          <td
            style={{
              borderLeft: '1px solid #ccc',
              padding: 0,
            }}
            colSpan="5"
          >
            <TaskEditor
              onClick={onTaskSave}
              encounterId={parentEncounterId}
            />
          </td>
        </tr> : null
      }
    </tbody>
  </table>
);

NestedPatientRow.propTypes = {
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
  onTaskSave: PropTypes.func.isRequired,
  showEditor: PropTypes.bool,
  parentEncounterId: PropTypes.string,
  desktopLayout: PropTypes.bool.isRequired,
  actionsDisabled: PropTypes.bool.isRequired,
};

export default NestedPatientRow;
