import React from 'react';
import Route from 'react-router/lib/Route';

export const taskingRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => require.ensure(
      [
        'srs/modules/tasking',
        'srs/modules/chartBin',
        'srs/modules/patientSearch',
      ],
      require => loader({
        nextState,
        cb,
        main: () => require('srs/modules/tasking'),
        left: () => (/appointment/i.test(path) ? require('srs/modules/chartBin') : require('srs/modules/patientSearch')),
      }),
      'ptChartBin',
    )}
  />
);
