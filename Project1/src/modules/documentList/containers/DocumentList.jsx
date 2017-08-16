import { connect } from 'react-redux';
import Documents from '../components/Documents';
import { getNextPage, sortColumn, onSelection } from 'srs/redux/documentList/actions';
import { getDenormalizedDocuments, getSortOrder }
  from 'srs/redux/documentList/reducers/documentList';

const mapStateToProps = state => ({
  documents: getDenormalizedDocuments(state),
  isInfiniteLoading: state.documentList.isInfiniteLoading,
  sortColumns: getSortOrder(state),
  isTabSelected: state.documentTabs.selectedTabId !== null,
  desktopLayout: state.browser.screenLayout === 'desktop',
  isFilterBoardVisible: state.documentFilter.isFilterBoardVisible,
});


const mapDispatchToProps = dispatch => ({
  onRowClick: (documentId) => {
    dispatch(onSelection(documentId));
  },
  onSortChanged: column =>
    dispatch(sortColumn(column)),
  onInfiniteLoad: () =>
    dispatch(getNextPage()),
});

const DocumentList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Documents);

export default DocumentList;
