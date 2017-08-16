import '../../chartBin/css/appointmentSearch.less';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DocumentListHeader from './DocumentListHeader';
import DocumentList from './DocumentList';
import ChartNavigation from '../../chartNavigation/containers/ChartNavigation';
import DocumentTabListMobile from '../../tabListMobile/containers/DocumentTabsList';

const mapStateToProps = state => ({
  desktopLayout: state.browser.mediaType === 'large' || state.browser.mediaType === 'extraLarge',
  selectedTabId: state.documentTabs.selectedTabId,
});

const App = connect(mapStateToProps)(({
  desktopLayout,
  selectedTabId,
}) => (
  desktopLayout || (selectedTabId >= 0 && selectedTabId !== null) ?
    <div className="chartbin">
      <DocumentListHeader />
      <DocumentList />
    </div>
    :
    <div className="chartbin">
      <ChartNavigation label="Document Tabs" />
      <DocumentTabListMobile />
    </div>
));

App.propTypes = {
  desktopLayout: PropTypes.bool.isRequired,
  selectedTabId: PropTypes.number,
};

export default App;
