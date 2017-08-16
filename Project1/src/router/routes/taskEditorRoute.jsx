import React from 'react';
import Route from 'react-router/lib/Route';

export const taskEditorRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => require.ensure(
      [
        'srs/modules/taskEditor',
      ],
      require => loader({
        nextState,
        cb,
        main: () => require('srs/modules/taskEditor'),
      }),
      'taskEditor',
    )}
  />
);
