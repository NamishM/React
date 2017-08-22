import React from 'react';
import Headroom from 'react-headroom';
import Logo from 'modules/Header/components/Logo';
import Navbar from 'modules/Header/components/Navbar';
import '../css/Header.css';

const Header = () => (
  <Headroom
    className="main_header"
    style={{
      height: '50px',
      padding: '0 20px',
      background: '#080808',
    }}
  >
    <Logo
      className={'header_logo'}
    />
    <Navbar />
  </Headroom>
);

export default Header;
