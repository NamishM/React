import React from 'react';
import Route from 'react-router/lib/Route';

export const patientEncounterRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => require.ensure(
      [
        'srs/modules/iDash',
        'srs/modules/patientEncounters',
      ],
      require => loader({
        nextState,
        cb,
        main: () => require('srs/modules/iDash'),
        left: () => require('srs/modules/patientEncounters'),
      }),
      'patientEncounters',
    )}
  />
);
