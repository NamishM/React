import React, { Component } from 'react';
import ClientsImageUI from './ClientsImageUI';
import VisibilitySensor from 'react-visibility-sensor';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podClassName: 'inner_color',
      changed: false,
    };
  }
  onChange = (isVisible) => {
    this.setState({ podClassName: isVisible && !this.state.changed ? 'inner_color_visible' : 'inner_color' });
    if (isVisible && !this.state.changed) {
      this.setState({ changed: true });
    }
  };
  render() {
    return (
      <div className="main_client" id="main-client">
        <div className="pod-container-wrap">
          <div className="pod-container">
            <div className="pod-item-no-image" />
            <VisibilitySensor onChange={this.onChange}>
              <ClientsImageUI podClass={this.state.podClassName} />
            </VisibilitySensor>
          </div>
        </div>
      </div>
    );
  }
}

export default Clients;
