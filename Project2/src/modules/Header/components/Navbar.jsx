import React from 'react';

const toggleClass = (ele) => {
  if (ele.className.includes('responsive')) {
    ele.classList.remove('responsive');
  } else {
    ele.classList.add('responsive');
  }
};

const Navbar = () => (
  <nav className="main_menu_nav" ref={(element) => { this.nav = element; }}>
    <button className="responsive_small_btn" onClick={() => { toggleClass(this.nav); }}><span className="menu-responsive-btn" /></button>
    <div className="nav_wrap">
      <ul id="main-menu" className="main_nav">
        <li id="menu-item-19" className="menu_item active"><a href="/#top" onClick={() => { toggleClass(this.nav); }}>Home</a></li>
        <li id="menu-item-21" className="menu_item"><a href="/#portfolio" onClick={() => { toggleClass(this.nav); }}>Portfolio</a></li>
        <li id="menu-item-22" className="menu_item"><a href="/#about" onClick={() => { toggleClass(this.nav); }}>About</a></li>
        <li id="menu-item-20" className="menu_item"><a href="/#services" onClick={() => { toggleClass(this.nav); }}>Services</a></li>
        <li id="menu-item-23" className="menu_item"><a href="/#contact" onClick={() => { toggleClass(this.nav); }}>Contact</a></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
