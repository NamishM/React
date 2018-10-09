import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppRouter } from './router/router';
import './index.css';
// import '!!style-loader!css-loader!less-loader!semantic-ui-less/semantic.less';

ReactDOM.render(
  <AppRouter />
  , document.getElementById('root'));
