import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NestedPatientRow from './NestedPatientRow';
import { taskStatus } from 'srs/redux/tasking/helpers/helper';
import RoomsDropDown from '../../../common/containers/RoomsDropDown';
import ExpandButton from './ExpandButton';
import TaskButtons from '../containers/TaskButtons';
import TaskIcon from '../containers/actionButtons/TaskIcon';
import DSpace from '../../../common/components/DSpace';
import { getRoomColor } from 'srs/redux/tasking/reducers/taskingDetails';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

class TaskRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
    };
  }
  render() {
    const {
      task,
      nestedTask,
      onTaskChangeSequence,
      onTaskSave,
      onTaskExpand = () => {},
      onClickPatientName = () => {},
      showEditor = false,
      actionsDisabled = false,
      desktopLayout,
      isHeldEncounter,
      onTaskAlertClick,
      taskingSettings,
    } = this.props;

    const backgroundColorStyle = { backgroundColor: getRoomColor(nestedTask) };
    let cssClass = this.state.expanded ? 'rowExpanded' : null;
    cssClass = task.taskStatusId === taskStatus.Hold.id ? `onHold ${cssClass}` : cssClass;

    const finishedTask =
      task.taskStatusDesc === taskStatus.Completed.desc ||
      task.taskStatusDesc === taskStatus.Cancelled.desc;

    return (
      <tbody>
        <tr
          style={{
            textDecoration:
              finishedTask ?
                'line-through' :
                null,
          }}
          className={cssClass}
        >
          <td
            style={{
              margin: 0,
              padding: 0,
            }}
            className="showPatientTasks"
          >
            <ExpandButton
              disabled={nestedTask.length === 0}
              expanded={this.state.expanded}
              onClick={() => {
                this.setState({ expanded: !this.state.expanded });
                onTaskExpand(task.encounterId);
              }}
            />
          </td>
          <td className="roomDesc" style={backgroundColorStyle}>
            <DSpace>{task.roomDescription}</DSpace>
          </td>
          <td className="taskDetails">
            <DSpace>{task.taskDetails}</DSpace>
          </td>
          <td
            className="patientName"
            onClick={onClickPatientName}
          >
            <DSpace>{task.patientName}</DSpace>
          </td>
          <td className="dob">
            <DSpace>{task.birthDate}</DSpace>
          </td>
          <td className="status">
            <DSpace>{task.taskStatusDesc}</DSpace>
          </td>
          <td className="lastAction">
            <DSpace>
              {
                task.taskStatusId === taskStatus.InProgress.id ||
                task.taskStatusId === taskStatus.Waiting.id ?
                  task.lastStateChange : null
              }
            </DSpace>
          </td>
          { !finishedTask ?
            <td
              className="lastColumn"
              style={actionsDisabled ? {
                pointerEvents: 'none',
                tabIndex: -1,
                opacity: 0.5,
              } : {}}
            >
              {
                task.isRoomsClicked ?
                  <RoomsDropDown
                    id={task.taskId}
                    selectedEncounter={task.encounterId}
                    selectedRoomId={task.roomId}
                    isOnTasking
                  />
                  :
                  <TaskButtons
                    canUpdateTasks={taskingSettings.canUpdateTasks}
                    canDeleteTasks={taskingSettings.canDeleteTasks}
                    task={task}
                    isHeldEncounter={isHeldEncounter}
                  />
              }
            </td>
            : <td className="lastColumn" />
          }
          { task.taskAlerts.length > 0 ?
            <td className="iconsColumn">
              <div className="btn-group">
                {
                  task.taskAlerts.map(icon => (
                    <TaskIcon
                      key={icon.title}
                      displayIcon={icon}
                      onClick={() =>
                        onTaskAlertClick(task, icon)
                      }
                    />),
                  )
                }
              </div>
            </td> : null
          }
          {
            task.taskAlerts.length <= 0 && desktopLayout ?
              <td className="iconsColumn" />
              : null
          }
        </tr>
        {this.state.expanded ?
          <tr
            className="childRow"
          >
            <td />
            <td />
            <td colSpan="7" className="nestedGrid">
              <NestedPatientRow
                patientTasks={nestedTask}
                onTaskChangeSequence={onTaskChangeSequence}
                onTaskSave={onTaskSave}
                showEditor={showEditor}
                parentEncounterId={task.encounterId}
                desktopLayout={desktopLayout}
                actionsDisabled={actionsDisabled || !taskingSettings.canUpdateTasks}
              />
            </td>
          </tr> : null
        }
      </tbody>
    );
  }
}

TaskRow.propTypes = {
  task: PropTypes.oneOfType([PropTypes.object]),
  nestedTask: PropTypes.arrayOf(PropTypes.shape({
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
  rooms: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    locationId: PropTypes.number,
    visible: PropTypes.bool,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  actionsDisabled: PropTypes.bool.isRequired,
  desktopLayout: PropTypes.bool.isRequired,
  onTaskChangeSequence: PropTypes.func.isRequired,
  onTaskSave: PropTypes.func.isRequired,
  onTaskExpand: PropTypes.func.isRequired,
  onClickPatientName: PropTypes.func.isRequired,
  showEditor: PropTypes.bool,
  expanded: PropTypes.bool,
  isHeldEncounter: PropTypes.bool,
  onTaskAlertClick: PropTypes.func.isRequired,
  taskingSettings: PropTypes.oneOfType([PropTypes.object]),
};

export default TaskRow;

