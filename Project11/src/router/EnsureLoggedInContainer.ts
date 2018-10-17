import * as React from 'react';
import { connect } from 'react-redux';
import browserHistory from './browserHistory';

let isLoggedInSession: boolean = false;
if (window.sessionStorage && window.sessionStorage.length) {
  isLoggedInSession = JSON.parse(window.sessionStorage.getItem("isLoggedIn") || '');
}

interface EnsureLoggedInProps {
  isLoggedIn: boolean;
  Component: string;
}

class EnsureLoggedInContainer extends React.Component<EnsureLoggedInProps, any> {
    componentDidMount() {
      if (!this.props.isLoggedIn && !isLoggedInSession) {
        if (this.props.Component === 'AppPage') {
          browserHistory.push("/login");
        } else {
          window.location.href="https://www.w3schools.com/";
        }        
      } else {
        browserHistory.push("/main")
      }
    }
  
    render() {

      if (this.props.isLoggedIn || isLoggedInSession) {
        return this.props.children;
      } else {
        return null;
      }
    }
  };
  
  const mapStateToProps = (state: any, ownProps: any) => ({
    isLoggedIn: state.auth.loginSuccess,
    Component: ownProps.component,
  });
  
  export default connect(mapStateToProps, null)(EnsureLoggedInContainer)