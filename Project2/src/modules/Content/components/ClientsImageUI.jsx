import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClientsImageUI extends Component {
  render() {
    const {
      podClass,
    } = this.props;
    return [
      <a key="A" href="https://www.acs.org.au/" className="pod-item">
        <div className="pod-item-sizer" />
        <figure className={podClass}>
          <div className="outer-image-container">
            <div className="image-container acs" />
          </div>
        </figure>
      </a>,
      <a key="B" href="https://www.sunsuper.com.au/" className="pod-item">
        <div className="pod-item-sizer" />
        <figure className={podClass}>
          <div className="outer-image-container">
            <div className="image-container sunspr" />
          </div>
        </figure>
      </a>,
      <a key="C" href="/" className="pod-item">
        <div className="pod-item-sizer" />
        <figure className={podClass}>
          <div className="outer-image-container">
            <div className="image-container eon" />
          </div>
        </figure>
      </a>,
      <a key="D" href="https://www.rbs.com/" className="pod-item">
        <div className="pod-item-sizer" />
        <figure className={podClass}>
          <div className="outer-image-container">
            <div className="image-container rbs" />
          </div>
        </figure>
      </a>,
      <a key="E" href="https://www.fidelity.co.uk/" className="pod-item">
        <div className="pod-item-sizer" />
        <figure className={podClass}>
          <div className="outer-image-container">
            <div className="image-container fidelity" />
          </div>
        </figure>
      </a>,
      <a key="F" href="https://www.lexisnexis.com/en-us/gateway.page" className="pod-item">
        <div className="pod-item-sizer" />
        <figure className={podClass}>
          <div className="outer-image-container">
            <div className="image-container ln" />
          </div>
        </figure>
      </a>,
    ];
  }
}

ClientsImageUI.propTypes = {
  podClass: PropTypes.string.isRequired,
};

export default ClientsImageUI;
