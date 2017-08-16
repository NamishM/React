import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTab from './DocumentTab';
import classes from '../css/documentTabs.css';
import Infinite from 'react-infinite';
import DTFilterDesktop from '../containers/DocumentTabFilterDesktop';
import chunk from 'lodash/chunk';

class DocumentTabs extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollHeight: 200 };
    this.handleResize = () => {
      this.setState({ scrollHeight: this.container.offsetHeight || 200 });
    };
  }
  componentDidMount() {
    // TODO: stop gap. Infinite does not work well with responsive heights.
    // Is this the best way to handle this?
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    const {
      tabs,
      selectedPersonId,
      selectedEncounterId,
      isInfiniteLoading = false,
      sortColumns,
      onRowClick,
      onInfiniteLoad,
      onSortChanged,
      desktopLayout,
    } = this.props;

    return (
      <div ref={(c) => { this.container = c; }} className={classes.container}>
        <DTFilterDesktop sortColumns={sortColumns} onSortChanged={onSortChanged} />
        <Infinite
          elementHeight={40}
          containerHeight={desktopLayout ? 87 : this.state.scrollHeight}
          className={classes.infiniteScroller}
          infiniteLoadBeginEdgeOffset={40}
          onInfiniteLoad={onInfiniteLoad}
          loadingSpinnerDelegate={
            <div className="infinite-list-item">
              Loading...
            </div>
          }
          isInfiniteLoading={isInfiniteLoading}
        >
          {
            !tabs ?
              <div /> :
              chunk(tabs, 6).map((set, index) =>
                (
                  <div className={classes.row}>
                    {
                      set.map(tab => (
                        <DocumentTab
                          key={tab.id}
                          {...tab}
                          onRowClick={() => onRowClick(
                            tab.id,
                            selectedPersonId,
                            selectedEncounterId,
                          )}
                          index={index}
                          desktopLayout={desktopLayout}
                        />),
                      )
                    }
                  </div>
                ),
              )
          }
        </Infinite>
      </div>
    );
  }
}

DocumentTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hasFiles: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
  onRowClick: PropTypes.func.isRequired,
  onInfiniteLoad: PropTypes.func.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  selectedPersonId: PropTypes.number.isRequired,
  selectedEncounterId: PropTypes.string.isRequired,
  desktopLayout: PropTypes.bool.isRequired,
};

export default DocumentTabs;
