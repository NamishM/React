import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../../patientTracking/css/PatientTracking.less';

const RefreshCounter = ({ counter, style = {}, className = '', isFullScreen }) => (
  <span
    className={className}
    style={style}
  >
    {
      isFullScreen ?
        <span>
          {counter > 1 ? `Refreshing in ${counter}` : 'Refreshing...'}
        </span> : null
    }
    {
      !isFullScreen && counter > 1 ?
        <span>
          <i className="fa fa-refresh slow-spin" aria-hidden="true" />
          <span className="counter">{counter}</span>
        </span>
        : null
    }
    {
      !isFullScreen && counter <= 1 ?
        <i className="fa fa-refresh fast-spin" aria-hidden="true" />
        : null
    }
  </span>
);

RefreshCounter.propTypes = {
  counter: PropTypes.number.isRequired,
  style: PropTypes.shape(),
  className: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (
  state,
  { style, className },
) => ({
  counter: state.taskingDetails.refreshCounter,
  style,
  className,
  isFullScreen: state.routing.isFullScreenMode,
});

export default connect(mapStateToProps)(RefreshCounter);
