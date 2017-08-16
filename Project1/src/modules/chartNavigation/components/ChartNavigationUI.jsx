import PropTypes from 'prop-types';
import React from 'react';
import Link from 'react-router/lib/Link';

const ChartNavigationUI = ({
  btnClassName,
  documentPath,
  patientEncounterPath,
}) => (
  <div className="btn-group btn_Adujustment" style={{ minWidth: '79px' }}>
    <Link
      type="button"
      id="btnidash"
      className={`btn ${btnClassName}`}
      title="iDash"
      to={patientEncounterPath}
      activeClassName="active"
    >
      <i className="fa fa-calendar" aria-hidden="true" />
    </Link>
    <Link
      type="button"
      id="btndocuments"
      className={`btn ${btnClassName}`}
      title="Documents"
      to={documentPath}
      activeClassName="active"
    >
      <i className="fa fa-file-o" aria-hidden="true" />
    </Link>
    {/* <button
      type="button"
      id="btnMessages"
      className={`btn ${btnClassName}`}
      title="Messages"
      disabled="disabled"
    >
      <i className="fa fa-envelope" aria-hidden="true" />
    </button>
    <button
      type="button"
      id="btnrx"
      className={`btn ${btnClassName}`}
      title="Rx"
      disabled="disabled"
    >
      Rx
    </button> */}
  </div>
);

ChartNavigationUI.propTypes = {
  btnClassName: PropTypes.string.isRequired,
  documentPath: PropTypes.string.isRequired,
  patientEncounterPath: PropTypes.string.isRequired,
};

export default ChartNavigationUI;
