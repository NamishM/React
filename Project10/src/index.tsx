import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppRouter } from './router/router';
import './index.css';
import "../my-semantic-theme/semantic.less"

ReactDOM.render(
  <AppRouter />
  , document.getElementById('root'));
