import '../../chartBin/css/appointmentSearch.less';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DocumentTabList from './DocumentTabList';

const mapStateToProps = state => ({
  desktopLayout: state.browser.mediaType === 'large' || state.browser.mediaType === 'extraLarge',
});

const App = connect(mapStateToProps)(({
  desktopLayout,
}) => (
  desktopLayout ?
    <div className="chartbin">
      <DocumentTabList />
    </div>
    : null
));

App.propTypes = {
  desktopLayout: PropTypes.bool.isRequired,
};

export default App;
