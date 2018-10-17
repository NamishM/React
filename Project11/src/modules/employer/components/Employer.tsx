import * as React from 'react';

interface Props extends React.Props<Employer> {
}

export default class Employer extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        This is Employer page!
      </div>
    );
  }
}