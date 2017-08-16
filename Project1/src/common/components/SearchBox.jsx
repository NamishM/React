import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/searchBox.css';

const SearchBox = ({ onAdvancedSearchClick, textValue, isFilterBoardVisible = false }) => (
  <div className={`${classes.searchBox} input-group`}>
    <span id="btnSearchIcon" className="input-group-addon">
      <i className="fa fa-search" aria-hidden="true" />
    </span>
    <input
      type="text"
      className="form-control"
      value={textValue}
      id="txtFilters"
      placeholder="Filters"
      title={textValue}
      disabled
    />
    <span className="input-group-btn">
      <button
        className={`${classes.hamburger} ${classes.hamburger_stand} ${isFilterBoardVisible ? classes.is_active : null} btn btn-default`}
        type="button"
        id="btnHamburger"
        title="Add"
        style={{ height: '34px' }}
        onClick={onAdvancedSearchClick}
      >
        <span className={classes.hamburger_box}>
          <span className={classes.hamburger_inner}>
            <i
              className={isFilterBoardVisible ? 'fa fa-times' : 'fa fa-bars'}
              aria-hidden="true"
            />
          </span>
        </span>
      </button>
    </span>
  </div>
);

SearchBox.propTypes = {
  onAdvancedSearchClick: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
  isFilterBoardVisible: PropTypes.bool,
};

export default SearchBox;
