import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';

const TaskIcon = ({
  displayIcon,
  onClick = () => {},
}) => (
  <Link
    id="linkTaskAlert"
    title={displayIcon.title}
    className={`iconStyle btn btn-${displayIcon.iconStatus} btn-xs`}
    onClick={onClick}
  >
    <i className={`fa ${displayIcon.icon}`} aria-hidden="true" />
  </Link>
);

TaskIcon.propTypes = {
  displayIcon: PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func.isRequired,
};

export default connect()(TaskIcon);
