import '../css/idash.less';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from '../css/idash.css';
import IDashHeader from '../components/IDashHeader';
import BlankHeader from '../components/BlankHeader';
import DemoGraphicsContainer from '../containers/DemoGraphicsContainer';
import { getAccessTokenMobileOrEhr } from 'srs/redux/user/reducers/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 1500, accessToken: props.accessToken };
    this.setHeight = ({ data: { height } }) => height && this.setState({ height });
    window.addEventListener('message', this.setHeight, false);
  }

  componentWillReceiveProps(nextProps) {
    // Don't update the accessToken if it's the only change.
    // Otherwise the IDash will refresh. It already get's the new
    // token for ajax requests.
    if (
      !this.state.accessToken || // no access token
      (
        this.state.accessToken && // have an access token
        (
          this.props.encounterId !== nextProps.encounterId || // but else something changed
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
    window.removeEventListener('message', this.setHeight);
  }

  render() {
    const {
      url,
      personId,
      encounterId = '{00000000-0000-0000-0000-000000000000}',
    } = this.props;

    const {
      accessToken,
      height,
    } = this.state;

    return (
      !personId ?
        <div className={classes.container}>
          <BlankHeader />
        </div>
        :
        <div className={classes.container}>
          <IDashHeader />
          <DemoGraphicsContainer />
          <iframe
            title="iDash"
            src={
              url + // eslint-disable-line prefer-template
              'EncounterID=' + encounterId + '&' +
              'personId=' + personId + '&' +
              'readOnly=false&access_token=' + accessToken
            }
            frameBorder="0"
            className={classes.iframe}
            data-auto="IFrame_IDash"
            seamless
            scrolling="no"
            style={{ height: `${height}px` }}
          />
        </div>
    );
  }
}

App.propTypes = {
  url: PropTypes.string,
  personId: PropTypes.number,
  encounterId: PropTypes.string,
  accessToken: PropTypes.string,
};

const mapStateToProps = state => ({
  url: state.login.config.iDashUrl,
  // The existing responsive iDash UI lives at this URL
  // url: 'http://summit-dev02/Granite.WebWidgets.PageProcessor/page/mobile/default.aspx?',
  // TODO: Potentially populate from shared state with chart and appointment selection
  // TODO: Changing the chart invalidates the selected appointment.
  encounterId: state.selectedChart.encounterId,
  personId: state.selectedChart.personId,
  accessToken: getAccessTokenMobileOrEhr(state),
});

export default connect(mapStateToProps)(App);
