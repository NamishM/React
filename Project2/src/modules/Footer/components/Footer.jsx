import React from 'react';
import '../css/Footer.css';

const Footer = () => (
  <footer
    className="footer"
    style={{ background: '#000000', height: '50px' }}
  >
    <div className="container">
      <span className="copyright">© Copyright 2017 - <a href="/">Namish One Page Portfolio </a> </span>
      <ul className="social_bookmarks">
        <li className="twitter"><a target="_blank" href="http://twitter.com/" rel="noopener noreferrer" aria-hidden="true" title="twitter" data-icon=""><span className="hidden_link_text">Twitter</span></a></li>
        <li className="facebook"><a target="_blank" href="http://facebook.com/" rel="noopener noreferrer" aria-hidden="true" title="Facebook" data-icon=""><span className="hidden_link_text">Facebook</span></a></li>
        <li className="dribbble"><a target="_blank" href="http://dribbble.com/" rel="noopener noreferrer" aria-hidden="true" title="Dribbble" data-icon=""><span className="hidden_link_text">Dribbble</span></a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
