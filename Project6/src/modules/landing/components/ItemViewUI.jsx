import React from 'react';
import PropTypes from 'prop-types';

const ItemViewUI = ({ items, getPlanetsData, planetsItem }) => (
  <div className="itemContainer">
    Galaxy Name:
    <ul>
      {
        items && items.length > 0 ? items.map((item, index) =>
          <li key={index}>
            <button
              onClick={(e) => {
                e.preventDefault();
                getPlanetsData(item.homeworld);
              }}
            >
              {item.name}
            </button>
          </li>,
        ) : <li>Please wait or see console for API error...</li>
      }
    </ul>
    <hr />
    {
      planetsItem ?
        <ul style={{ color: '#b9b6b6' }}>
          <li>Planet Name: {planetsItem.name}</li>
          <li>Planet Population: {planetsItem.population}</li>
          <li>Planet Terrain: {planetsItem.terrain}</li>
        </ul> : 'No Valid Data present, Click on ablove options to see data and be patient while data loads'
    }
  </div>
);

ItemViewUI.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      homeworld: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  planetsItem: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      poplulation: PropTypes.string.isRequired,
      terrain: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  getPlanetsData: PropTypes.func.isRequired,
};

export default ItemViewUI;
