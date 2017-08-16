import './superagent.global'; // Hack to get this to run first.
import outdatedBrowser from 'exports?outdatedBrowser!outdated-browser/outdatedbrowser/outdatedbrowser';
import '!!style!css!outdated-browser/outdatedbrowser/outdatedbrowser.css';
import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import Router from './router/main.router';
/* eslint-disable */
// These files will be included in our /dist folder.
import '!!file?name=[name].[ext]!./theme/favicon/android-chrome-192x192.png';
import '!!file?name=[name].[ext]!./theme/favicon/android-chrome-512x512.png';
import '!!file?name=[name].[ext]!./theme/favicon/apple-touch-icon.png';
import '!!file?name=[name].[ext]!./theme/favicon/browserconfig.xml';
import '!!file?name=[name].[ext]!./theme/favicon/favicon.ico';
import '!!file?name=[name].[ext]!./theme/favicon/favicon-16x16.png';
import '!!file?name=[name].[ext]!./theme/favicon/favicon-32x32.png';
import '!!file?name=[name].[ext]!./theme/favicon/manifest.json';
import '!!file?name=[name].[ext]!./theme/favicon/mstile-150x150.png';
import '!!file?name=[name].[ext]!./theme/favicon/safari-pinned-tab.svg';
import '!!file?name=[name].[ext]!outdated-browser/outdatedbrowser/lang/en.html';
/* eslint-enable */

render(
  <Router />,
  document.getElementById('main'),
);

outdatedBrowser({
  bgColor: '#f25648',
  color: '#ffffff',
  lowerThan: 'borderImage',
  languagePath: './static/en.html',
});

// http://stackoverflow.com/a/4585031/402706
// ((history) => {
//  const pushState = history.pushState;
//  // eslint-disable-next-line no-param-reassign
//  history.pushState = function pushStateIntercept(state) {
//    if (typeof history.onpushstate === 'function') {
//      history.onpushstate({ state });
//    }
//    // ... whatever else you want to do
//    // maybe call onhashchange e.handler
//    // eslint-disable-next-line prefer-rest-params
//    return pushState.apply(history, arguments);
//  };
// })(window.history);
