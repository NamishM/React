import React from 'react';
import Header from 'modules/Header/components/Header';
import Footer from 'modules/Footer/components/Footer';

const MainView = () => (
  <div>
    <Header />
    <iframe id="iframe" src="./assets/saved_resource.html" title="iframe" height="709px" />
    <Footer />
  </div>
);

export default MainView;
