import React, { Component } from 'react';

const inProgress = 'progtrckr-todo';
const completed = 'progtrckr-done';

class ProgressBar extends Component {
  render() {
    const {
      state
    } = this.props;
    return (
      <div className="progressBar">
        <ol className="progtrckr" data-progtrckr-steps="5">
          <li className={`${state.pageNumber <= 1 ? inProgress : completed} `}>Get Sender Address</li>
          <li className={`${state.pageNumber <= 2 ? inProgress : completed} `}>Get Receiver Address</li>
          <li className={`${state.pageNumber <= 3 ? inProgress : completed} `}>Get Weight</li>
          <li className={`${state.pageNumber <= 4 ? inProgress : completed} `}>Get Shipping Option</li>
          <li className={`${state.pageNumber <= 5 ? inProgress : completed} `}>Confirm</li>
        </ol>
      </div>
    );
  }
}

export default ProgressBar;