import { connect } from 'react-redux';
import PdfNavigation from '../components/PdfNavigation';
import {
  pdfPreviousPage,
  pdfNextPage,
  pdfZoomIn,
  pdfZoomOut,
  pdfRotateRight,
  pdfRotateLeft,
  viewNotes,
} from 'srs/redux/documentList/actions';

const mapStateToProps = ({ documentList, documentNotesList }) => ({
  pageNumber: documentList.document.pageNumber,
  pageCount: documentList.document.pageCount,
  isNotesVisible: documentNotesList.isNotesVisible,
});

// all method signatures match so use shorthand instead of mapDispatchToProps
const DocumentArea = connect(
  mapStateToProps,
  {
    onPreviousPageClick: pdfPreviousPage,
    onNextPageClick: pdfNextPage,
    onZoomPlusClick: pdfZoomIn,
    onZoomOutClick: pdfZoomOut,
    onRotateLeftClick: pdfRotateLeft,
    onRotateRightClick: pdfRotateRight,
    onNotesButtonClick: viewNotes,
  },
)(PdfNavigation);

export default DocumentArea;
