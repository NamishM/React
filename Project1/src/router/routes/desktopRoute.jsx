import React from 'react';
import Route from 'react-router/lib/Route';

export const desktopRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => require.ensure(
      [
        'srs/modules/patientTracking',
        'srs/modules/chartBin',
        'srs/modules/patientSearch',
      ],
      require => loader({
        nextState,
        cb,
        main: () => require('srs/modules/patientTracking'),
        left: () => (/appointment/i.test(path) ? require('srs/modules/chartBin') : require('srs/modules/patientSearch')),
      }),
      'ptChartBin',
    )}
  />
);
