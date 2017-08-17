import React from 'react';
import Headroom from 'react-headroom';
import {
  Link,
} from 'react-router-dom';

const linkStyle = {
  lineHeight: '50px',
  textDecoration: 'none',
};

const NavBar = () => (
  <Headroom
    style={{
      height: '50px',
      padding: '4px',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <h1
        style={{
          display: 'inline-block',
          border: 'none',
          lineHeight: '50px',
          height: '50px',
          margin: '0 0 0 10px',
          verticalAlign: 'top',
        }}
      >ABC</h1>
    </div>
    <div>
      <Link style={linkStyle} to={'/'}>XYZ</Link>
    </div>
  </Headroom>
);

export default NavBar;
