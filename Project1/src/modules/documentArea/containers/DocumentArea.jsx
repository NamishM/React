import { connect } from 'react-redux';
import DocumentAreaUI from '../components/DocumentAreaUI';
import {
  pdfDocumentLoaded,
} from 'srs/redux/documentList/actions';
import { getDenormalizedNotes }
  from 'srs/redux/documentList/reducers/documentNotesList';

const mapStateToProps = state => ({
  isTabSelected: state.documentTabs.selectedTabId !== null,
  isDocumentSelected: state.documentList.selectedDocumentId !== null,
  documentContent: state.documentList.document.content,
  pageNumber: state.documentList.document.pageNumber,
  pageCount: state.documentList.document.pageCount,
  scale: state.documentList.document.scale,
  rotation: state.documentList.document.rotation,
  isNotesVisible: state.documentNotesList.isNotesVisible,
  notes: getDenormalizedNotes(state),
});

// all method signatures match so use shorthand instead of mapDispatchToProps
const DocumentArea = connect(
  mapStateToProps,
  {
    onDocumentLoaded: pdfDocumentLoaded,
  },
)(DocumentAreaUI);

export default DocumentArea;
