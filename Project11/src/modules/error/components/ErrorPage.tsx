import * as React from 'react';

interface Props extends React.Props<ErrorPage> {
}


export default class ErrorPage extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        400 Bad Request!
      </div>
    );
  }
}