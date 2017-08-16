import PropTypes from 'prop-types';
import React from 'react';

const BottomPanel = ({ content }) => (
  <div className="drawers">
    {content}
  </div>
);

BottomPanel.propTypes = {
  content: PropTypes.element,
};

export default BottomPanel;
