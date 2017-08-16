import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RoomsSlider from './RoomsSlider';
import TaskGrid from './TaskGrid';
import EncountersList from 'srs/modules/NoTaskGrid/containers/EncountersList';
import FiltersLayout from './FiltersLayout';
import PatientTrackingHeader from '../../patientTracking/components/PatientTrackingHeader';
// TODO: Get rid of all less files
import '../css/Tasking.less';
import classes from '../../NoTaskGrid/css/encounters.css';
import { noTaskGridToggle } from 'srs/redux/tasking/actions/nestedTaskExpandAction';
import { isLoadedWithAccessToken } from '../../../auth/oidc';
import RefreshCounter from './RefreshCounter';

const getClassName = (fullScreenFlag, state) => {
  if (state === 'open') {
    return isLoadedWithAccessToken || fullScreenFlag ? 'sideFilters open appView' : 'sideFilters open';
  }

  return isLoadedWithAccessToken || fullScreenFlag ? 'sideFilters closed appView' : 'sideFilters closed';
};

const App = ({
  isFilterBoardVisible,
  isNoTaskGridVisible,
  onNoTaskGridToggle,
  isFullScreenMode = false,
  isAppEnabled,
  noTaskHeader = 'Patients Checked-In with No Tasks',
}) => (
  <div style={{ height: 'inherit' }}>
    {
      isFullScreenMode && isLoadedWithAccessToken ?
        null
        : <PatientTrackingHeader />
    }
    {
      isAppEnabled ?
        <div className="mainApp">
          {
            isFullScreenMode ?
              <RefreshCounter
                style={{
                  position: 'fixed',
                  color: '#ccc',
                  margin: '10px 0 0 5px',
                }}
              />
              :
              null
          }
          { isFullScreenMode ? <span style={{ clear: 'both' }}>&nbsp;</span> : null }
          <div className={isFullScreenMode ? 'roomTracker full-width' : 'roomTracker'}>
            <div>
              <RoomsSlider />
            </div>
          </div>
          <div className={isNoTaskGridVisible ? 'taskGrids noscroll' : 'taskGrids'}>
            <div className={isNoTaskGridVisible ? 'noTaskGrids expanded' : 'noTaskGrids collapsed'}>
              <div className="noTaskGrid">
                <button
                  className={
                    isNoTaskGridVisible ?
                      `${classes.header} panel-heading open` :
                      `${classes.header} panel-heading`
                  }
                  onClick={() => {
                    onNoTaskGridToggle();
                  }}
                  data-auto="no_task_grid"
                >
                  {noTaskHeader}
                  {isNoTaskGridVisible ?
                    <i className="fa fa-caret-up" aria-hidden="true" /> :
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  }
                </button>
                <div className="panel" aria-expanded={isNoTaskGridVisible}>
                  {
                    isNoTaskGridVisible ? <EncountersList /> : null
                  }
                </div>
              </div>
            </div>
            <div>
              <TaskGrid data-auto="taskGrids" />
            </div>
          </div>
          <div
            className={isFilterBoardVisible ? getClassName(isFullScreenMode, 'open') : getClassName(isFullScreenMode, 'close')}
          >
            <div style={{ height: '100%' }}>
              <FiltersLayout />
            </div>
          </div>
        </div>
        :
        <div className="mainApp">
          You do not have permission to view this area
        </div>
    }
  </div>
);

const mapDispatchToProps = dispatch => ({
  onNoTaskGridToggle: () =>
    dispatch(noTaskGridToggle()),
});

App.propTypes = {
  isFilterBoardVisible: PropTypes.bool.isRequired,
  isNoTaskGridVisible: PropTypes.bool.isRequired,
  isAppEnabled: PropTypes.bool.isRequired,
  noTaskHeader: PropTypes.string,
  onNoTaskGridToggle: PropTypes.func.isRequired,
  isFullScreenMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isFilterBoardVisible: state.filtersReducer.isFilterBoardVisible,
  isNoTaskGridVisible: state.nestedTaskReducer.isNoTaskGridVisible,
  isAppEnabled: state.login.isTaskingEnabled,
  isFullScreenMode: state.routing.isFullScreenMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
