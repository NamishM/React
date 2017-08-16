import PropTypes from 'prop-types';
import React from 'react';
import classes from '../../../common/css/cardLayout.css';
import format from 'date-fns/format';
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years';
import PatientPicture from 'srs/common/containers/PatientPicture';
import ChartNavigation from 'srs/modules/chartNavigation/containers/ChartNavigation';

const Patient = ({ name, dob, isSelected, onRowClick, id }) => (
  <div
    className={classes.container}
    style={{
      backgroundColor: isSelected ? '#d9edf7' : '#ffffff',
    }}
  >
    <div className={`${classes.header} srs-header-tertiary`}>
      <div />
      <ChartNavigation personId={id} />
    </div>
    <div
      onClick={onRowClick}
      className={classes.body}
    >
      <div className={classes.patientImage}>
        <PatientPicture personId={id} width="60" cacheId="pat1" />
      </div>
      <div className={classes.patientInfo}>
        <div className={classes.patientName} >{name === '' ? <i>No Name</i> : name}</div>
        <div>{dob ? format(dob, 'MM/DD/YYYY') : <i>No dob</i>}</div>
        {
          dob && (
            <div>
              Age: {differenceInCalendarYears(new Date(), dob)}y
            </div>
          )
        }
      </div>
      <div className={classes.appointmentInfo} />
    </div>
  </div>
);

Patient.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dob: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default Patient;
