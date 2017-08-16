import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import PatientTrackingList from './PatientTrackingList';
import PatientTrackingHeader from '../components/PatientTrackingHeader';
import classes from '../css/patientTracking.css';
import '../css/PatientTracking.less';

const App = ({
  isDefaultLoaded,
}) => (
  <div className={classes.patientTrackingApp}>
    <PatientTrackingHeader />
    {
      isDefaultLoaded ? <PatientTrackingList /> : null
    }
  </div>
);

App.propTypes = {
  isDefaultLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  chartBinFilter: {
    isDefaultLoaded,
  },
}) => ({
  isDefaultLoaded,
});

export default connect(mapStateToProps)(App);
