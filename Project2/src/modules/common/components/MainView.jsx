import React, { Component } from 'react';
import Header from 'modules/Header/components/Header';
import Content from 'modules/Content/components/Content';
import Footer from 'modules/Footer/components/Footer';
import '../../../global.css';

class MainView extends Component {
  componentDidMount() {
    setTimeout(() => { window.scrollTo(0, 0); }, 700);
  }
  render() {
    return (
      <div
        style={{ height: '100%' }}
        ref={(div) => { this.mainDiv = div; }}
      >
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default MainView;
