import React from 'react';
import Route from 'react-router/lib/Route';

export const chartRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => {
      require.ensure(
        [
          'srs/modules/patientTracking',
          'srs/modules/patientSearch',
        ],
        require => loader({
          nextState,
          cb,
          main: () => require('srs/modules/patientTracking'),
          left: () => require('srs/modules/patientSearch'),
        }),
        'ptChartSearch',
      );
    }}
  />
);
