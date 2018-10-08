import './superagent.global'; // Hack to get this to run first.
import '!!style!css!outdated-browser/outdatedbrowser/outdatedbrowser.css';
import * as React from "react";
import { render } from 'react-dom';
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import Router from './router/main.router';
let outdatedBrowser = require("./outdatedbrowser.js");

const renderComponent = Component => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('main'),
);

renderComponent(Router);

if (module.hot) {
  module.hot.accept('./router/main.router', () => { renderComponent(Router); });
}

outdatedBrowser({
  bgColor: '#f25648',
  color: '#ffffff',
  lowerThan: 'borderImage',
  languagePath: './static/en.html',
});


