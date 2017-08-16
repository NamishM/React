import { connect } from 'react-redux';
import DTFilterDesktopUI from '../components/DocumentTabFilterDesktopUI';
import * as actions from 'srs/redux/documentTabsFilter/actions';
import { getbuttonText }
  from 'srs/redux/documentTabsFilter/reducers/documentTabsFilter';

const mapStateToProps = ({
  documentTabsFilter: {
    drawers,
    isFilterBoardVisible,
    ishasDocumentChecked,
  },
  browser: {
    screenLayout,
  },
}, ownProps) => ({
  drawers,
  isFilterBoardVisible,
  buttonText: getbuttonText(drawers, ishasDocumentChecked),
  ishasDocumentChecked,
  sortColumns: ownProps.sortColumns,
  onSortChanged: ownProps.onSortChanged,
  desktopLayout: screenLayout === 'desktop',
});

const mapDispatchToProps = dispatch => ({
  toggleVisiblity: () => {
    dispatch(actions.toggleVisiblity());
  },
  filterTabs: (selectedDrawers, ishasDocumentChecked) => {
    dispatch(actions.filterDocumentTabs(selectedDrawers, ishasDocumentChecked));
  },
  resetToDefault: () => {
    dispatch(actions.resetToDefault());
  },
});

const DocumentTabFilterDesktop =
    connect(mapStateToProps, mapDispatchToProps)(DTFilterDesktopUI);

export default DocumentTabFilterDesktop;
