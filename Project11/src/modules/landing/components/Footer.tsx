import * as React from 'react';

interface Props extends React.Props<Footer> {
}

export default class Footer extends React.Component<Props, {}> {
  render() {
    return (
      <div className="Footer">
        <p>Copyright @2018 Namfame - Private &amp; Confidential</p>
      </div>
    );
  }
}

