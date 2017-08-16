import PropTypes from 'prop-types';
import React from 'react';
import ChartNavigation from '../../chartNavigation/containers/ChartNavigation';
import classes from '../css/document.css';

const chartBinHeader = ({
  selectedTabName,
  backToTabs,
  selectedPersonId,
  selectedEncounterId,
  selectedTabId,
  desktopLayout,
}) => (
  <div>
    {
      selectedTabId && !desktopLayout ?
        <div
          className="srs-header-secondary"
        >
          <h4>{selectedTabName}</h4>
          <div className="btn-group btn_Adujustment">
            <button
              type="button"
              id="btnback"
              className="btn btn-primary"
              title="Click to go back"
              onClick={() => backToTabs(selectedPersonId, selectedEncounterId)}
              activeClassName="active"
            >
              <i className={`${classes.goBackButton} fa fa-folder-open`} aria-hidden="true" />
            </button>
          </div>
        </div>
        : <ChartNavigation label={selectedTabName} />
    }
  </div>
);

chartBinHeader.propTypes = {
  desktopLayout: PropTypes.bool.isRequired,
  selectedTabName: PropTypes.string.isRequired,
  selectedTabId: PropTypes.number,
  backToTabs: PropTypes.func.isRequired,
  selectedPersonId: PropTypes.number.isRequired,
  selectedEncounterId: PropTypes.string.isRequired,
};

export default chartBinHeader;
