import PropTypes from 'prop-types';
import React from 'react';

const DSpace = ({
  children,
}) => (
  <span>{children || '\u00a0'}</span>
);

DSpace.propTypes = {
  children: PropTypes.string,
};

export default DSpace;
