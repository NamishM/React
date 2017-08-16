import PropTypes from 'prop-types';
import React from 'react';

const Option = ({ name, id }) => (
  <option value={id}>{name}</option>
);

Option.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Option;
