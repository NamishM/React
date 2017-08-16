import PropTypes from 'prop-types';
import React, { Component } from 'react';

let panelArray = [];

class PatientTrackingStatus extends Component {
  constructor(props) {
    super(props);

    // define state of expand/collapse for accordian of grid as per sreen size
    const desktopArray = new Array(props.lenOfGroup).fill(true);
    const mobileArray = new Array(props.lenOfGroup).fill(false);
    if (props.desktopLayout) {
      panelArray = desktopArray;
    } else {
      mobileArray[0] = true; // expand first panel and collapse rest of panel for mobile
      panelArray = mobileArray;
    }

    if (panelArray.length) {
      this.state = {
        expanded: panelArray,
      };
    } else {
      this.state = {
        expanded: [true],
      };
    }
  }
  render() {
    const {
      patientTrackingDesc,
      patientTrackingColor,
      patientTrackingStatusTaskListLength,
      index,
      children,
    } = this.props;
    const groupBorderStyle = { borderColor: patientTrackingColor === 'rgb(255,255,255)' ? 'rgb(204,204,204)' : patientTrackingColor };

    const groupButtonColorStyle = patientTrackingColor === 'rgb(255,255,255)' ?
      { border: '1px solid rgb(204,204,204)' } : { backgroundColor: patientTrackingColor };
    const fillExpanded = (i) => {
      panelArray[i] = !panelArray[i];
    };
    const cssClass = patientTrackingStatusTaskListLength > 0 ? 'groupTasks' : 'groupTasks noTask';
    return (
      <div>
        <button
          className="panel-heading"
          data-auto={patientTrackingDesc}
          onClick={() => {
            fillExpanded(index);
            this.setState({ expanded: panelArray });
          }}
          style={groupButtonColorStyle}
        >
          {patientTrackingDesc}
          <i className={this.state.expanded[index] ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true" />
        </button>
        <div className="panel" aria-expanded={this.state.expanded[index]}>
          <div className={cssClass} style={groupBorderStyle}>
            <table data-auto={`table-${patientTrackingDesc}`}>
              <thead>
                <tr>
                  <th className="expandColumn" />
                  <th className="room">Room</th>
                  <th className="taskDetails">Task Details</th>
                  <th className="patient">Patient</th>
                  <th className="dob">DOB</th>
                  <th className="status">Status</th>
                  <th className="lastAction">Last Update</th>
                  <th className="actions">Action</th>
                  <th className="iconsColumn" />
                </tr>
              </thead>
              {children}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

PatientTrackingStatus.propTypes = {
  patientTrackingStatusTaskListLength: PropTypes.number.isRequired,
  patientTrackingId: PropTypes.number.isRequired,
  patientTrackingDesc: PropTypes.string.isRequired,
  patientTrackingColor: PropTypes.string.isRequired,
  desktopLayout: PropTypes.bool.isRequired,
  lenOfGroup: PropTypes.number,
  index: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PatientTrackingStatus;
