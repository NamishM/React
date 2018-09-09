import React from 'react';
import Router from './router/main.router';
import initStore from './store';
import { AppContainer } from 'react-hot-loader';
import ReactDom from 'react-dom';

const store = initStore();

const render = Component => ReactDom.render(
  <AppContainer>
    <Component store={store} />
  </AppContainer>,
  document.getElementById('root'),
);

render(Router);

if (module.hot) {
  module.hot.accept('./router/main.router', () => { render(Router); });
}
