import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import AnimationCount from 'react-count-animation';
import '../css/count.min.css';

const settings = {
  start: 1,
  count: 14,
  duration: 1500,
  decimals: 0,
  useGroup: true,
  animation: 'up',
};
const settings2 = {
  start: 1,
  count: 10,
  duration: 1000,
  decimals: 0,
  useGroup: true,
  animation: 'roll',
};
const settings3 = {
  start: 1,
  count: 2190,
  duration: 2000,
  decimals: 0,
  useGroup: true,
  animation: 'slide',
};

class ProjectNumbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startNumberAnimation: false,
      changed: false,
    };
  }
  onChange = (isVisible) => {
    this.setState({ startNumberAnimation: isVisible && !this.state.changed });
    if (isVisible && !this.state.changed) {
      this.setState({ changed: true });
    }
  };
  render() {
    return (
      <div id="about" className="about_fullsize">
        <div className="container">
          <div className="template-page">
            <div className="three_fifth">
              <div className="profile-image-container">
                <div className="profile-image-container-inner">
                  <img className="my_image " src="/src/assets/images/180x180.jpg" alt="proflePic" title="namish mudgal" />
                </div>
              </div>
              <div className="desc-container">
                <h3 className="special-heading-tag">
                  This is me. Designer by day <span className="special_amp">&amp;</span> developer by night. I never sleep… almost.
                </h3>
              </div>
              <div className="more-desciption">
                Innovation is the key and execution is the success part.
                If we combine the two, nothing is impossible.
                Worked for Clients all across the globe on this theory.
                <div className="border-bottom" />
              </div>
              <VisibilitySensor onChange={this.onChange}>
                <div className="numbers-animation">
                  <span className="numbers-style">
                    <div className="counter-number">
                      {
                        this.state.startNumberAnimation ? <AnimationCount {...settings} /> : '14'
                      }
                    </div>
                    <div className="counter-desc">successful projects</div>
                  </span>
                  <span className="numbers-style">
                    <div className="counter-number">
                      {
                        this.state.startNumberAnimation ? <AnimationCount {...settings2} /> : '10'
                      }
                    </div>
                    <div className="counter-desc">happy clients</div>
                  </span>
                  <span className="numbers-style">
                    <div className="counter-number">
                      {
                        this.state.startNumberAnimation ? <AnimationCount {...settings3} /> : '2,190'
                      }
                    </div>
                    <div className="counter-desc">days of experience</div>
                  </span>
                </div>
              </VisibilitySensor>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectNumbers;
