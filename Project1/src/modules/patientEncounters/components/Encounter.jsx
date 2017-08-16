import PropTypes from 'prop-types';
import React from 'react';
// import '../css/appointmentSearch.less';
import classes from '../../../common/css/cardLayout.css';
import format from 'date-fns/format';
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years';

const Encounter = ({
  name,
  visitType,
  time,
  dob,
  isSelected,
  colorCode,
  onRowClick,
  doctorName,
  roomDescription,
}) => (
  <div
    onClick={onRowClick}
    className={classes.container}
  >
    <div className={`${classes.header} srs-header-tertiary`}>
      <div>
        <span className="fa-stack">
          <i
            className="fa fa-bookmark fa-stack-1x"
            style={{
              color: `rgb(${colorCode})`,
              fontSize: !colorCode ? '1em' : '1.5em',
            }}
          />
          {!colorCode ? <i className="fa fa-ban fa-stack-2x text-danger" /> : null }
        </span>
      </div>
    </div>
    <div
      className={classes.body}
      style={{
        backgroundColor: isSelected ? '#d9edf7' : '#ffffff',
      }}
    >
      <div className={classes.patientInfo}>
        <div className={classes.patientName} >{name === '' ? <i>No Name</i> : name}</div>
        <div>{dob ? format(dob, 'MM/DD/YYYY') : <i>No dob</i>}</div>
        <div
          style={{
            display: dob ? 'inline' : 'none',
          }}
        >
          Age: {differenceInCalendarYears(new Date(), dob)}y
        </div>
      </div>
      <div className={classes.appointmentInfo}>
        <div className={classes.patientName}>{doctorName}</div>
        <div>{visitType}</div>
        <div>{time === '' ? 'No time' : format(time, 'hh:mm A')}</div>
        <div>{roomDescription}</div>
      </div>
    </div>
  </div>
);

Encounter.propTypes = {
  personId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  visitType: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  colorCode: PropTypes.string,
  doctorName: PropTypes.string.isRequired,
  roomDescription: PropTypes.string,
};

export default Encounter;
