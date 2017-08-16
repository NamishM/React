import { connect } from 'react-redux';
import DocumentTabFilterUI from '../components/DocumentTabFilterUI';
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
}) => ({
  drawers,
  isFilterBoardVisible,
  buttonText: getbuttonText(drawers, ishasDocumentChecked),
  ishasDocumentChecked,
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

const DocumentTabFilter = connect(mapStateToProps, mapDispatchToProps)(DocumentTabFilterUI);

export default DocumentTabFilter;
