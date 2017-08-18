import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({
  className,
}) => (
  <div className={className} style={{ lineHeight: '50px', width: '250px', float: 'left' }}>
    <a style={{ cursor: 'pointer' }}>
      <img src="/assets/images/logo_portfolio.png" alt="my logo" style={{ width: '250px' }} />
    </a>
  </div>
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
