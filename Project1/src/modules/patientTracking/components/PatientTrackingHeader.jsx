import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { onRefreshClick } from 'srs/redux/patientTracking/actions';
import { onTaskingRefreshClick } from 'srs/redux/tasking/actions/taskingActions';
import Link from 'react-router/lib/Link';
import { getChartBinFilterUrl } from 'srs/redux/chartBinFilter/reducers/chartBinFilter';
import RefreshCounter from '../../tasking/containers/RefreshCounter';
import classes from '../css/patientTracking.css';

const PatientTrackingHeader = ({
  onClick,
  onTaskingRefresh,
  isTaskingEnabled,
  location,
  chartbinQueryString,
  isFullScreenMode = false,
  leftArea,
}) => {
  // TODO: The title should go in the application state.
  let title = null;
  switch (true) {
    case /tasking/i.test(location):
      title = isTaskingEnabled ? 'Tasking' : 'N/A';
      break;
    case /desktop/i.test(location):
    case /chart/i.test(location):
      title = 'Patient Tracker';
      break;
    default:
      // invalid state
      title = null;
      break;
  }

  return (
    <div className="srs-header-secondary">
      <h4>{title}</h4>
      <div className="btn-group">
        {
          !isTaskingEnabled || isFullScreenMode ?
            null :
            <Link
              type="button"
              className="btn btn-primary rightPanel"
              title="Patient Tracker"
              to={`desktop/${leftArea}${chartbinQueryString}`}
              activeClassName="active"
            >
              <i className="fa fa-list" aria-hidden="true" />
            </Link>
        }
        {
          !isTaskingEnabled || isFullScreenMode ?
            null :
            <Link
              type="button"
              className="btn btn-primary"
              title="Tasking"
              to={`tasking/${leftArea}${chartbinQueryString}`}
              activeClassName="active"
            >
              <i className="fa fa-tasks" aria-hidden="true" />
            </Link>
        }
        {
          /desktop/i.test(location) ?
            <button
              type="button"
              title="Refresh"
              className="btn btn-primary"
              onClick={onClick}
            >
              <i className="fa fa-refresh" aria-hidden="true" />
            </button> : null
        }

        {
          !/desktop/i.test(location) && isTaskingEnabled && !isFullScreenMode ?
            <Link
              type="button"
              title="Refresh"
              className={`btn btn-primary ${classes.btnRefresh}`}
              onClick={onTaskingRefresh}
            >
              <RefreshCounter
                style={{
                  color: '#fff',
                }}
              />
            </Link> : null
        }
      </div>
    </div>
  );
};

PatientTrackingHeader.propTypes = {
  isFullScreenMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onTaskingRefresh: PropTypes.func.isRequired,
  isTaskingEnabled: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  chartbinQueryString: PropTypes.string,
  leftArea: PropTypes.string,
};

const mapStateToProps = state => ({
  isFullScreenMode: state.routing.isFullScreenMode,
  isTaskingEnabled: state.login.isTaskingEnabled,
  location: state.routing.currentPath,
  chartbinQueryString: getChartBinFilterUrl(state),
  leftArea: state.wireframe.leftArea,
});

export default connect(
  mapStateToProps,
  {
    onClick: onRefreshClick,
    onTaskingRefresh: onTaskingRefreshClick,
  },
)(PatientTrackingHeader);

