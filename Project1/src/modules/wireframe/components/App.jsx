import '../css/wireframe.less';
import PropTypes from 'prop-types';
import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import BottomPanel from './BottomPanel';
// import TopMenu from './TopMenu';
import PatientInfo from '../containers/PatientInfo';
import PatientAlert from '../../alerts';
import TaskEditingForm from '../../taskEditor/containers/TaskEditingForm';
import TaskingAlerts from '../../alerts/containers/TaskingAlerts';
import TimeOutAlertUI from '../../alerts/components/TimeOutAlertUI';
import IdleTimer from '../../silentRenew/containers/IdleTimer';
import { isLoadedWithAccessToken } from '../../../auth/oidc';

// update outdated browser styling for EHR only
if (isLoadedWithAccessToken) {
  const sheet = (() => {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  })();

  sheet.insertRule(
    '#outdated #btnUpdateBrowser { display: none !important }',
    0,
  );
  sheet.insertRule(
    '#outdated h6 { margin: 45px 0 25px !important }',
    0,
  );
  sheet.insertRule(
    '#outdated > p:not(.last):before { content:\'This is problem with IE browser. \' }',
    0,
  );
  sheet.insertRule(
    '#outdated > p:not(.last):after { content:\'Close this window and update browser manually.\' }',
    0,
  );
}

const App = ({
  left,
  main,
  bottom,
  fullscreen,
  isDesktopLayout,
  desktopVisiblePanel,
  deviceVisiblePanel,
  onDesktopToggleFullscreen,
  onSmallTogglePanels,
  isLoggedIn,
  isDisplayTimeOutAlert,
  pathName,
  isTaskingEnabled,
}) => {
  if (isLoggedIn === false && pathName !== 'login') {
    return null;
  }

  if (fullscreen) {
    return (
      <div className="full-height">
        <IdleTimer />
        { isDisplayTimeOutAlert ? <TimeOutAlertUI /> : null }
        { isTaskingEnabled ? <TaskingAlerts /> : null }
        {fullscreen}
      </div>
    );
  }

  // Let the left/right panels decide how they will render when supposed to be hidden.
  // If we instead didn't render the panels, user will lose context on toggling areas.

  return (
    <div className="container-fluid">
      <IdleTimer />
      <PatientAlert />
      { isTaskingEnabled ? <TaskingAlerts /> : null }
      <TaskEditingForm />
      { isDisplayTimeOutAlert ? <TimeOutAlertUI /> : null }
      <PatientInfo
        isDesktopLayout={isDesktopLayout}
        desktopVisiblePanel={desktopVisiblePanel}
        deviceVisiblePanel={deviceVisiblePanel}
        onDesktopToggleFullscreen={onDesktopToggleFullscreen}
        onSmallTogglePanels={onSmallTogglePanels}
      />
      <div
        className={`${bottom && isDesktopLayout ? 'bottomVisible' : null} main row`}
      >
        <LeftPanel
          content={left}
          isDesktopLayout={isDesktopLayout}
          desktopVisiblePanel={desktopVisiblePanel}
          deviceVisiblePanel={deviceVisiblePanel}
        />
        <RightPanel
          content={main}
          isDesktopLayout={isDesktopLayout}
          desktopVisiblePanel={desktopVisiblePanel}
          deviceVisiblePanel={deviceVisiblePanel}
        />
      </div>
      {
        bottom ? <BottomPanel content={bottom} /> : null
      }
    </div>
  );
};

App.propTypes = {
  fullscreen: PropTypes.element,
  main: PropTypes.element,
  left: PropTypes.element,
  bottom: PropTypes.element,
  isDesktopLayout: PropTypes.bool.isRequired,
  deviceVisiblePanel: PropTypes.string.isRequired,
  desktopVisiblePanel: PropTypes.string.isRequired,
  onSmallTogglePanels: PropTypes.func.isRequired,
  onDesktopToggleFullscreen: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isDisplayTimeOutAlert: PropTypes.bool.isRequired,
  pathName: PropTypes.string.isRequired,
  isTaskingEnabled: PropTypes.bool.isRequired,
};

export default App;
