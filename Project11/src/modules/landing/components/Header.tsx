import * as React from 'react';
import { Header } from 'semantic-ui-react';

interface Props extends React.Props<HeaderUI> {
}

export default class HeaderUI extends React.Component<Props, {}> {
  render() {
    return (
      <div className="Header">
        <Header size='large'>The Star Wars API</Header>
      </div>
    );
  }
}
