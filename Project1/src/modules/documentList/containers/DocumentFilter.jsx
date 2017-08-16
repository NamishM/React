import { connect } from 'react-redux';
import DocumentFilterUI from '../components/DocumentFilterUI';
import * as actions from 'srs/redux/documentFilter/actions';
import { getbuttonText }
  from 'srs/redux/documentFilter/reducers/documentFilter';

const mapStateToProps = ({
  documentFilter: {
    isShowDeletedChecked,
    isFilterBoardVisible,
  },
}) => ({
  isShowDeletedChecked,
  isFilterBoardVisible,
  buttonText: getbuttonText(isShowDeletedChecked),
});

const mapDispatchToProps = dispatch => ({
  toggleVisiblity: () => {
    dispatch(actions.toggleVisiblity());
  },
  filterDocuments: (isShowDeletedChecked) => {
    dispatch(actions.filterDocuments(isShowDeletedChecked));
  },
  resetToDefault: () => {
    dispatch(actions.resetToDefault());
  },
});

const DocumentFilter = connect(mapStateToProps, mapDispatchToProps)(DocumentFilterUI);

export default DocumentFilter;
