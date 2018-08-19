import React from 'react';
import Header from 'modules/Header/components/Header';
import Content from 'modules/Content/components/Content';
import Footer from 'modules/Footer/components/Footer';
import '../../../global.css';

const MainView = () => (
  <div style={{ height: '100%' }}>
    <Header />
    <Content />
    <Footer />
  </div>
);

export default MainView;
