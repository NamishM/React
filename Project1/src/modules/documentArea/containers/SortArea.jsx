import { connect } from 'react-redux';
import DocumentNotesSortArea from '../components/DocumentNotesSortArea';
import {
  sortNotesColumn,
} from 'srs/redux/documentList/actions';
import { getSortOrder }
  from 'srs/redux/documentList/reducers/documentNotesList';

const mapStateToProps = state => ({
  sortColumns: getSortOrder(state),
});

// all method signatures match so use shorthand instead of mapDispatchToProps
const DocumentArea = connect(
  mapStateToProps,
  {
    onSortChanged: sortNotesColumn,
  },
)(DocumentNotesSortArea);

export default DocumentArea;
