import '../css/appointmentSearch.less';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FilterNavigation from '../../filterNavigation/containers/FilterNavigation';
import AppointmentList from './AppointmentList';

const App = ({
  isDefaultLoaded,
}) => (
  <div className="chartbin">
    <FilterNavigation label="Appointments" />
    {
      isDefaultLoaded ? <AppointmentList /> : null
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
