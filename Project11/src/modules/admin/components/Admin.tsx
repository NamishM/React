import * as React from 'react';

interface Props extends React.Props<Admin> {
}

export default class Admin extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        This is Admin page!
      </div>
    );
  }
}