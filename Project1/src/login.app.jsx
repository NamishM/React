import './superagent.global'; // Hack to get this to run first.
import outdatedBrowser from 'exports?outdatedBrowser!outdated-browser/outdatedbrowser/outdatedbrowser';
import '!!style!css!outdated-browser/outdatedbrowser/outdatedbrowser.css';
import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import Router from './router/login.router';
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
