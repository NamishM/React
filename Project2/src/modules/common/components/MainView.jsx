import React from 'react';
import Header from 'modules/Header/components/Header';

const MainView = () => (
  <div>
    <Header />
    <iframe id="iframe" src="./assets/saved_resource.html" title="iframe" height="709px" />
  </div>
);

export default MainView;
