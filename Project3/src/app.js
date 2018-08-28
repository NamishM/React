import React, { Component } from 'react';
import Login from './core/components/login/Login';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <div className="footer">
          <footer>
            <p className="copyrightTitle">Copyright © 2017 Publicis Group</p>
          </footer>
        </div>
      </div>
      
    );
  }
}

export default App;
