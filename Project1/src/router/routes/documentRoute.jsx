import React from 'react';
import Route from 'react-router/lib/Route';

export const documentRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => require.ensure(
      [
        'srs/modules/documentArea',
        'srs/modules/documentList',
        'srs/modules/tabsList',
      ],
      require => loader({
        nextState,
        cb,
        main: () => require('srs/modules/documentArea'),
        left: () => require('srs/modules/documentList'),
        bottom: () => require('srs/modules/tabsList'),
      }),
      'documents',
    )}
  />
);
