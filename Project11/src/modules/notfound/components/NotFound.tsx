import * as React from 'react';

interface Props extends React.Props<NotFound> {
}

export default class NotFound extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        404 Not Found!
      </div>
    );
  }
}