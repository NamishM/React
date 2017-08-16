import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAccessTokenMobileOrEhr,
  getUserId,
} from 'srs/redux/user/reducers/login';

class PatientPicture extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, accessToken: props.accessToken };
  }

  componentDidMount() {
    const self = this;
    this.timer = setTimeout(() => {
      self.setState({ loading: false });
    }, 750);
  }

  componentWillReceiveProps(nextProps) {
    // Don't update the accessToken if it's the only change.
    // Otherwise the VisitPicture will refresh.
    if (
      !this.state.accessToken || // no access token
      (
        this.state.accessToken && // have an access token
        (
          this.props.personId !== nextProps.personId
        )
      )
    ) {
      this.setState({
        accessToken: nextProps.accessToken,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {
      width = 30,
      url,
      personId,
      className,
      cacheId = '1',
    } = this.props;

    const {
      accessToken,
    } = this.state;

    if (this.state.loading) {
      return (<img
        alt="Patient"
        src={require('../css/defaultPatient.png')}
        className={className}
      />);
    }
    return (
      <img
        alt="Patient"
        src={
          url + // eslint-disable-line prefer-template
          'VisitPic/png/0/' + width + '/default.aspx?' +
          'personId=' + personId + '&' +
          'cacheBuster=' + cacheId + '&' +
          'access_token=' + accessToken
        }
        className={className}
      />
    );
  }
}

PatientPicture.propTypes = {
  url: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  personId: PropTypes.number.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  cacheId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  iDashUrl: state.login.config.iDashUrl,
  userId: getUserId(state),
  accessToken: getAccessTokenMobileOrEhr(state),
  personId: ownProps.personId,
  className: ownProps.className,
  width: ownProps.width,
  url: `${state.login.config.iDashUrl.split(/PageProcessor/i)[0]}PageProcessor/`,
});

export default connect(mapStateToProps)(PatientPicture);
