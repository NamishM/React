import { connect } from 'react-redux';
import IdleTimerComponent from '../components/IdleTimer';
import {
  onIdle,
  onActive,
} from 'srs/redux/idle/actions';

const mapStateToProps = state => ({
  element: document,
  ref: 'idleTimer',
  timeout: global.config.userIsIdleTimeout,
  statusChanged: state.idle.statusChanged,
});

const IdleTimer = connect(
  mapStateToProps,
  {
    activeAction: onActive,
    idleAction: onIdle,
  },
)(IdleTimerComponent);

export default IdleTimer;
