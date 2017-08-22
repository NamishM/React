import React from 'react';
import { Parallax } from 'react-parallax';

const Introduction = () => (
  <Parallax bgImage="../../../assets/images/hero-image-grey-1500x1500.jpg" strength={400}>
    <div className="container caption_container">
      <div className="caption">
        <div className="inner_caption">
          <div className="align_caption">
            <h2 className="caption-title" >Welcome !<br />I am Namish Mudgal</h2>
            <div className="caption-content">
              <p>I am a India based developer specialized in branding and web design.<br />
                Take a look at my work and if you like it I would love to hear from you!
              </p>
            </div>
            <a href="/#about" className="button color-light" target="_blank">Learn more</a>
            <a href="/#contact" className="button color-theme" target="_blank">Get in Touch</a>
          </div>
        </div>
      </div>
      <a href="/#next-section" className="scroll-down-link" aria-hidden="true" data-av_icon="" data-iconfont="entypo-fontello" target="_blank">scroll</a>
    </div>
  </Parallax>
);


export default Introduction;
