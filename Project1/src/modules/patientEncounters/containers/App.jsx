import '../../chartBin/css/appointmentSearch.less';
import React from 'react';
import ChartNavigation from '../../chartNavigation/containers/ChartNavigation';
import EncounterList from './EncounterList';

const App = () => (
  <div className="chartbin">
    <ChartNavigation label="Encounters" />
    <EncounterList />
  </div>
);

export default App;
