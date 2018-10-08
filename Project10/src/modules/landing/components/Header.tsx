import * as React from 'react';

interface Props extends React.Props<Header> {
}

export default class Header extends React.Component<Props, {}> {
  render() {
    return (
      <div className="Header">
        <h1>The Star Wars API</h1>
      </div>
    );
  }
}
