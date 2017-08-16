import PropTypes from 'prop-types';
import React from 'react';
import ChartNavigationUI from './ChartNavigationUI';
import classes from '../css/chartNavigation.css';

const Header = ({
  textValue,
  hidden,
  documentPath,
  patientEncounterPath,
}) => (
  <div
    className={textValue ? 'srs-header-secondary' : classes.chartbinNavigationonCard}
  >
    <h4>{textValue}</h4>
    {
      !hidden ?
        <ChartNavigationUI
          documentPath={documentPath()}
          patientEncounterPath={patientEncounterPath()}
          btnClassName={textValue ? 'btn-primary' : 'btn-default'}
        />
        : null
    }
  </div>
);

Header.propTypes = {
  textValue: PropTypes.string,
  hidden: PropTypes.bool,
  documentPath: PropTypes.func.isRequired,
  patientEncounterPath: PropTypes.func.isRequired,
};

export default Header;
