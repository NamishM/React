import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import SilentRenewer from 'srs/modules/silentRenew/components/SilentRenewer';

render(
  <SilentRenewer />,
  document.getElementById('main'),
);
