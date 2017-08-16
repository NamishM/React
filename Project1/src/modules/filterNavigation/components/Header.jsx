import PropTypes from 'prop-types';
import React from 'react';
import Link from 'react-router/lib/Link';
// import '../css/appointmentSearch.less';

const chartBinHeader = ({
  selectAppointment,
  selectSerach,
  textValue,
  chartbinQueryString,
  mainArea,
}) => (
  <div
    className="srs-header-secondary"
  >
    <h4>{textValue}</h4>
    <div className="btn-group btn_Adujustment" style={{ minWidth: '79px' }}>
      <Link
        type="button"
        id="btnappointment"
        className="btn btn-primary"
        title="Appointments"
        to={`${mainArea}/appointment${chartbinQueryString}`}
        onClick={() => selectAppointment()}
        activeClassName="active"
      >
        <i className="fa fa-calendar" aria-hidden="true" />
      </Link>
      <Link
        type="button"
        id="btnsearch"
        className="btn btn-primary"
        title="Search"
        to={`${mainArea}/chart${chartbinQueryString}`}
        onClick={() => selectSerach()}
        activeClassName="active"
      >
        <i className="fa fa-search" />
      </Link>
      {/* <button
        type="button"
        id="btnfavorite"
        className="btn btn-primary"
        title="Favorites"
        disabled="disabled"
      >
        <i className="fa fa-star-o" />
      </button>
      <button
        type="button"
        id="btnrecentappointment"
        className="btn btn-primary"
        title="Recent"
        disabled="disabled"
      >
        <i className="fa fa-calendar" />
      </button> */}
    </div>
  </div>
);

chartBinHeader.propTypes = {
  selectAppointment: PropTypes.func.isRequired,
  selectSerach: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
  chartbinQueryString: PropTypes.string,
  mainArea: PropTypes.string,
};

export default chartBinHeader;
