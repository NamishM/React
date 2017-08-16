import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ChartNavigation from '../../chartNavigation/containers/ChartNavigation';
import { getSelectedDocument } from 'srs/redux/documentList/reducers/documentList';

const mapStateToProps = state => ({
  selectedDocumentName: getSelectedDocument(state)
    ? getSelectedDocument(state).documentName
    : 'Document Area',
});

const DocumentHeader = connect(mapStateToProps)(({
  selectedDocumentName,
}) => (
  <ChartNavigation label={selectedDocumentName} hideWhenLarge />
));

DocumentHeader.propTypes = {
  selectedDocumentName: PropTypes.string,
};
export default DocumentHeader;
