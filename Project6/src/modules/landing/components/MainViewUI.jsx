import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import ItemViewUI from './ItemViewUI';

const MainViewUI = (
  { loginSuccess, items, getPlanetsData, planetsItem },
) => (
  <div className="mainContainer">
    {
      loginSuccess ?
        <div className="mainView">
          <Header />
          <ItemViewUI
            items={items}
            getPlanetsData={getPlanetsData}
            planetsItem={planetsItem}
          />
          <Footer />
        </div> :
        <div>You are not authorized! Please do a valid login.</div>
    }
  </div>
);

MainViewUI.propTypes = {
  loginSuccess: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  planetsItem: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  getPlanetsData: PropTypes.func.isRequired,
};

export default MainViewUI;
