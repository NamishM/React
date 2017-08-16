import React from 'react';
import { connect } from 'react-redux';
import ConAdvanceSearch from './ConAdvanceSearch';
import PatientList from './PatientList';
import FilterNavigation from '../../filterNavigation/containers/FilterNavigation';
import '../../chartBin/css/appointmentSearch.less'; // TODO: Shared component?
import '../css/patientSearch.less';

const PatientSearch = () => (
  <div className="patientSearch">
    <FilterNavigation label="Search" />
    <ConAdvanceSearch />
    <PatientList />
  </div>
);

export default connect()(PatientSearch);
