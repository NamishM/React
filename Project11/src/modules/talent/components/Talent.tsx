import * as React from 'react';

interface Props extends React.Props<Talent> {
}

export default class Talent extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        This is talent page!
      </div>
    );
  }
}