import React from 'react';
import Headroom from 'react-headroom';
import '../css/Footer.css';

const Footer = () => (
  <footer class="container_wrap socket_color">
    <div class="container">
      <span class="copyright">© Copyright  - <a href="/">Namish One Page Portfolio </a> </span>
      <ul class="noLightbox social_bookmarks icon_count_3">
        <li class="social_bookmarks_twitter av-social-link-twitter social_icon_1"><a target="_blank" href="http://twitter.com/" aria-hidden="true" data-av_icon="" data-av_iconfont="entypo-fontello" title="Twitter"><span class="avia_hidden_link_text">Twitter</span></a></li>
        <li class="social_bookmarks_facebook av-social-link-facebook social_icon_2"><a target="_blank" href="http://facebook.com/" aria-hidden="true" data-av_icon="" data-av_iconfont="entypo-fontello" title="Facebook"><span class="avia_hidden_link_text">Facebook</span></a></li>
        <li class="social_bookmarks_dribbble av-social-link-dribbble social_icon_3"><a target="_blank" href="http://dribbble.com/" aria-hidden="true" data-av_icon="" data-av_iconfont="entypo-fontello" title="Dribbble"><span class="avia_hidden_link_text">Dribbble</span></a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
