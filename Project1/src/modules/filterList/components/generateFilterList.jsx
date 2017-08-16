import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SortIndicator from '../../../common/components/SortIndicator';
import classes from '../css/infiniteScroller.css';
import Infinite from 'react-infinite';

const generateFilterList = (Filter) => {
  class FilterList extends Component {
    constructor(props) {
      super(props);
      this.state = { scrollHeight: 200 };
      this.handleResize = () => {
        const offsetHeight = this.container.clientHeight || this.container.offsetHeight || 200;
        if (
          this.state.scrollHeight !== offsetHeight &&
          this.container.offsetHeight !== 0
        ) {
          this.setState({ scrollHeight: offsetHeight });
        }
      };
    }
    componentDidMount() {
      // TODO: stop gap. Infinite does not work well with responsive heights.
      // Is this the best way to handle this?
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
    // componentDidUpdate() {
    //   // this.handleResize();
    // }
    componentWillReceiveProps() {
      this.handleResize();
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
    render() {
      const {
        isInfiniteLoading = false,
        sortColumns,
        onInfiniteLoad,
        onSortChanged,
        elementHeight = 109,
        isFilterBoardVisible,
        filterBoardPanelHeight,
      } = this.props;
      return (
        <div ref={(c) => { this.container = c; }} className={classes.container}>
          {Filter ? <Filter /> : null}
          <div className={classes.sortArea} >
            {
              sortColumns.map(column => (
                column.label !== '' && column.name !== '' ?
                  <SortIndicator
                    key={column.id}
                    onClick={() => onSortChanged(column.id)}
                    label={column.label}
                    status={column.state}
                    disabled={!column.name}
                  /> :
                  null
              ))
            }
          </div>
          <Infinite
            elementHeight={elementHeight}
            containerHeight={isFilterBoardVisible ?
              this.state.scrollHeight - filterBoardPanelHeight : this.state.scrollHeight}
            className={classes.infiniteScroller}
            infiniteLoadBeginEdgeOffset={200}
            onInfiniteLoad={onInfiniteLoad}
            loadingSpinnerDelegate={
              <div className="infinite-list-item">
                Loading...
              </div>
            }
            isInfiniteLoading={isInfiniteLoading}
          >
            {this.props.children}
          </Infinite>
        </div>
      );
    }
  }

  FilterList.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    isInfiniteLoading: PropTypes.bool,
    isFilterBoardVisible: PropTypes.bool.isRequired,
    filterBoardPanelHeight: PropTypes.number.isRequired,
    onInfiniteLoad: PropTypes.func.isRequired,
    onSortChanged: PropTypes.func.isRequired,
    sortColumns: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired),
    noDataText: PropTypes.string,
    elementHeight: PropTypes.number,
  };

  return FilterList;
};

export default generateFilterList;
