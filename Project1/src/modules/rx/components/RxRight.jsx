import PropTypes from 'prop-types';
import React from 'react';

const RxRight = ({ id = 'divWidget',
}) => (
  <div
    id={id}
  />
);

RxRight.propTypes = {
  id: PropTypes.string,
};

export default RxRight;

