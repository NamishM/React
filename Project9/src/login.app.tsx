import './superagent.global'; // Hack to get this to run first.
import '!!style!css!outdated-browser/outdatedbrowser/outdatedbrowser.css';
import * as React from "react";
import { render } from 'react-dom';
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import LandingUI from './modules/landing/components/LandingUI';
let outdatedBrowser = require("./outdatedbrowser.js");

const renderComponent = Component => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('main'),
);

renderComponent(LandingUI);

if (module.hot) {
  module.hot.accept('./modules/landing/components/LandingUI', () => { renderComponent(LandingUI); });
}

outdatedBrowser({
  bgColor: '#f25648',
  color: '#ffffff',
  lowerThan: 'borderImage',
  languagePath: './static/en.html',
});


