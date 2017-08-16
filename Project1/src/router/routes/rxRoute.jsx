import React from 'react';
import Route from 'react-router/lib/Route';
import { initRx } from 'srs/redux/rx/actions';
import { select } from 'react-cookie';

const onInit = (store, { location: { query } }) => {
  // Get value from cookie
  const results = select(/^patientId$/i);
  const encounterResults = select(/^EncounterId$/i);
  // Ensure case does not matter
  // Get the first results
  let personExternalId = results[Object.keys(results)[0]];
  let encounterId = encounterResults[Object.keys(encounterResults)[0]];

  // Use the found personExternalId or find the next one from the URL
  personExternalId = personExternalId ||
  Object.keys(query)
    .reduce((prev, curr) =>
      (curr.toLowerCase() === 'patientid' ? query[curr] : prev),
    '',
    );

  encounterId = encounterId || Object.keys(query)
    .reduce((prev, curr) =>
      (curr.toLowerCase() === 'encounterid' ? query[curr] : prev),
    '',
    );
  if (personExternalId) {
    if (encounterId) {
      encounterId = encounterId.replace('{', '');
      encounterId = encounterId.replace('}', '');
    }
    store.dispatch(
      initRx(personExternalId, encounterId),
    );
  }
};

export const rxRoute = (path, loader) => (
  <Route
    path={path}
    getComponents={(nextState, cb) => require.ensure(
      [
        'srs/modules/rx',
      ],
      require => loader({
        nextState,
        cb,
        main: () => require('srs/modules/rx'),
        onInit: store => onInit(store, nextState),
      }),
      'rx',
    )}
  />
);
