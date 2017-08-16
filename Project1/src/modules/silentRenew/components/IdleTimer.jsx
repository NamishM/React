import PropTypes from 'prop-types';
/**
 * React Idle Timer. Derrived from
 * https://github.com/SupremeTechnopriest/react-idle-timer
 */
import { Component } from 'react';
import throttle from 'lodash/throttle';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import { trueTimeout } from 'srs/utilities';

// TODO: This entire class could be refactored into a SAGA.
// We could then remove the statusChanged timestamp as we would have access to
// the event stream of IDLE_ACTION, IDLE_ACTION_SILENT, & IDLE_INACTIVE.
export default class IdleTimer extends Component {
  static propTypes = {
    timeout: PropTypes.number, // Activity timeout
    events: PropTypes.arrayOf(PropTypes.string), // Activity events to bind
    idleAction: PropTypes.func, // Action to call when user becomes inactive
    activeAction: PropTypes.func, // Action to call when user becomes active
    // Element ref to watch activty on
    element: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    format: PropTypes.string,
    startOnLoad: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    activityThrottleTime: PropTypes.number,
    statusChanged: PropTypes.number,
  };

  static defaultProps = {
    timeout: 1000 * 60 * 20, // 20 minutes
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mouseWheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
    ],
    idleAction: () => {},
    activeAction: () => {},
    element: document,
    startOnLoad: true,
    activityThrottleTime: 2500,
  };

  constructor(props) {
    super(props);
    this._handleEvent = throttle(this._handleEvent.bind(this), this.props.activityThrottleTime);
    this.reset = this.reset.bind(this);
  }

  state = {
    oldDate: +new Date(),
    tId: null,
    pageX: null,
    pageY: null,
  };

  componentWillMount() {
    this.props.events.forEach(e => this.props.element.addEventListener(e, this._handleEvent));
  }

  componentDidMount() {
    if (this.props.startOnLoad) this.reset();
  }

  componentWillUnmount() {
    // Clear timeout to prevent delayed state changes
    if (this.state.tId) {
      this.state.tId();
    }
    // Unbind all events
    this.props.events.forEach(e => this.props.element.removeEventListener(e, this._handleEvent));
  }

  _onTimeout() {
    const difference = differenceInMilliseconds(new Date(), this.props.statusChanged);
    // Is the difference between the last status change and now greater than our
    // allowed amount of inactivity?
    if (difference > this.props.timeout) {
      this.props.idleAction(difference);
    } else {
      this.reset();
    }
  }

  /**
   * Event handler for supported event types
   *
   * @param  {Object} e event object
   * @return {void}
   *
   */
  _handleEvent(e) {
    // Mousemove event
    if (e.type === 'mousemove') {
      if (
        // if coord are same, it didn't move
        (e.pageX === this.state.pageX && e.pageY === this.state.pageY) ||
        // if coord don't exist how could it move
        (typeof e.pageX === 'undefined' && typeof e.pageY === 'undefined') ||
        // under 200 ms is hard to do, and you would have to stop,
        // as continuous activity will bypass this
        ((+new Date()) - this.state.oldDate < 200)
      ) {
        return;
      }
    }

    // clear any existing timeout
    if (this.state.tId) {
      this.state.tId();
    }

    // call the active action
    this.props.activeAction();

    this.setState({
      pageX: e.pageX, // update mouse coord
      pageY: e.pageY,
      tId: trueTimeout(this._onTimeout.bind(this), this.props.timeout), // set a new timeout
    });
  }

  /**
   * Restore initial settings and restart timer
   *
   * @return {Void}
   *
   */
  reset() {
    // reset timers
    if (this.state.tId) {
      this.state.tId();
    }

    // reset settings
    this.setState({
      idle: false,
      oldDate: +new Date(),
      tId: trueTimeout(this._onTimeout.bind(this), this.props.timeout),
    });
  }

  render() {
    return this.props.children ? this.props.children : null;
  }
}
