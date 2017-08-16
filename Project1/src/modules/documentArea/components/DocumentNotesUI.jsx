import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/documentNotes.css';
import format from 'date-fns/format';

const DocumentNotesUI = ({ notes }) => (
  <div className={classes.documentNotes}>
    {
      !notes || notes.length === 0 ?
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          No Notes exist
        </div>
        :
        notes.map(appointment => (
          <div
            className={classes.note}
          >
            <div className={`${classes.subject} col-xs-12 col-sm-12 col-md-6 col-lg-6`}>
              <strong>Sent:</strong> {format(appointment.sent, 'MM/DD/YYYY hh:mm A')}
            </div>
            <div className={`${classes.subject} col-xs-12 col-sm-12 col-md-6 col-lg-6`}>
              <strong>Electronically Signed by:</strong> {appointment.sender}
            </div>
            <br />
            <div className={`${classes.subject} col-xs-12 col-sm-12 col-md-6 col-lg-6`}>
              <strong>Subject:</strong> {appointment.subject}
            </div>
            <div className={`${classes.subject} col-xs-12 col-sm-12 col-md-6 col-lg-6`}>
              <strong>Priority:</strong> {appointment.priorityCode}
            </div>
            <br />
            <br />
            <div className={`${classes.message} col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
              {appointment.message}
            </div>
          </div>),
        )
    }
  </div>
);

DocumentNotesUI.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    priorityCode: PropTypes.string.isRequired,
    sent: PropTypes.string.isRequired,
    regardingPatient: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }).isRequired),
};

export default DocumentNotesUI;

