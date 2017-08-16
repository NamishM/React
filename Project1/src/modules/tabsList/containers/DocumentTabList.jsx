import { connect } from 'react-redux';
import DocumentTabs from '../components/DocumentTabs';
import { getNextPage, sortColumn, onSelection } from 'srs/redux/documentTabs/actions';
import { push } from 'react-router-redux';
import { getDenormalizedDocumentTabs, getSortOrder }
  from 'srs/redux/documentTabs/reducers/documentTabs';

const mapStateToProps = state => ({
  tabs: getDenormalizedDocumentTabs(state),
  selectedPersonId: state.selectedChart.personId,
  selectedEncounterId: state.selectedChart.encounterId === '{00000000-0000-0000-0000-000000000000}'
    ? null : state.selectedChart.encounterId,
  isInfiniteLoading: state.documentTabs.isInfiniteLoading,
  sortColumns: getSortOrder(state),
  desktopLayout: state.browser.screenLayout === 'desktop',
});


const mapDispatchToProps = dispatch => ({
  onRowClick: (documentGroupId, personId, encounterId) => {
    dispatch(onSelection(documentGroupId));
    dispatch(push({
      pathname: '/document',
      query: {
        personId,
        documentGroupId,
        encounterId,
      },
    }));
  },
  onSortChanged: column =>
    dispatch(sortColumn(column)),
  onInfiniteLoad: () =>
    dispatch(getNextPage()),
});

const DocumentTabList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentTabs);

export default DocumentTabList;
