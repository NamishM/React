import React, { Component } from 'react';
import { processSilentRenew } from 'redux-oidc';

export default class extends Component {
  constructor() {
    super();
    processSilentRenew();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return <h1>Silent</h1>;
  }
}
