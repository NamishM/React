import PropTypes from 'prop-types';
import React from 'react';
import format from 'date-fns/format';
import classes from '../css/patientTracking.css';
import Label from './Label';
import Value from './Value';

// to convert 12:23:45  ->>>  12 h : 23 m
const getDurationFormat = (value) => {
  const array = value.split(':');
  return `${array[0]} h: ${array[1]} m`;
};

const PatientTracking = ({
  name,
  doctorname,
  encounterDate,
  roomDescription,
  status,
  duration,
  color,
  index,
}) => (
  <div
    className={`${classes.ptRow} row ${index % 2 ? classes.odd : classes.even}`}
    style={{
      backgroundColor: status ? 'pink' : 'none',
    }}
  >
    <Label>Name</Label>
    <Value>{name}</Value>
    <Label>Provider</Label>
    <Value>{doctorname}</Value>
    <Label>Room</Label>
    <Value>{roomDescription}</Value>
    <Label>Status</Label>
    <Value>
      <span>
        {
          color ?
            <i
              className="fa fa-bookmark"
              style={{
                color: color ? `rgb(${color})` : 'none',
              }}
            />
            : null
        }
        {` ${status && status !== 'null' ? status : ''}`}
      </span>
    </Value>
    <Label>Appt.</Label>
    <Value>{!encounterDate ? 'No time' : format(encounterDate, 'hh:mm A')}</Value>
    <Label>Duration</Label>
    <Value>{duration ? getDurationFormat(duration) : null}</Value>
  </div>
);

PatientTracking.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doctorname: PropTypes.string.isRequired,
  encounterDate: PropTypes.string.isRequired,
  roomDescription: PropTypes.string,
  status: PropTypes.string,
  duration: PropTypes.string,
  color: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default PatientTracking;
