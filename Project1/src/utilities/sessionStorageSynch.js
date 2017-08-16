import { v4 } from 'uuid';
import Events from 'minivents';

// synchronizes sessionStorage between multiple tabs
class SessionStorageSynch extends Events {
  constructor({
    localStorage = global.localStorage,
    sessionStorage = global.sessionStorage,
    window = global,
  }) {
    super();
    this.tabIds = {};
    this._localStorage = localStorage;
    this._sessionStorage = sessionStorage;

    if (!this._localStorage || !this._sessionStorage ||
       (!window.addEventListener && !window.attachEvent)
    ) {
      if (global.console) {
        if (global.console.warn) {
          global.console.warn('SessionStorageSynch is unsupported in this environment');
        } else if (global.console.log) {
          global.console.log('SessionStorageSynch is unsupported in this environment');
        }
      }
      return;
    }

    this._increaseGlobalTabCount();

    // listen for changes to localStorage
    if (window.addEventListener) {
      window.addEventListener('storage', this._messageReceived.bind(this), false);
      window.addEventListener('beforeunload', this._closingOrNavigating.bind(this), false);
    } else {
      window.attachEvent('onstorage', this._messageReceived.bind(this));
      window.attachEvent('onbeforeunload', this._closingOrNavigating.bind(this));
    }

    this.id = v4().toString();
    this.on('newTab', (data) => {
      this.tabIds[data.fromId] = true;
      this.sendTo(data.fromId, 'newTabSession', this._sessionStorage);
    });

    this.on('tabRemoved', (data) => {
      // The tab firing tabRemoved will reset tabs count in localStorage
      // remaining should then register their count.
      // Todo: there's potential race condition here b/w tabs updating tabs count.
      // Acceptable for now as side effect would only result in underreported tabs.
      if (data.fromId !== this.id) {
        this._increaseGlobalTabCount();
      }
      delete this.tabIds[data.fromId];
    });

    this.on('removeItem', data => this._sessionStorage.removeItem(data.message.name));

    this.on('setItem', (data) => {
      this._sessionStorage.setItem(data.message.name, data.message.value);
    });

    this.on('newTabSession', (data) => { this.tabIds[data.fromId] = true; });

    this.once('newTabSession', (data) => {
      const session = data.message;
      Object.keys(session).forEach((key) => {
        if ({}.hasOwnProperty.call(session, key) && !this.sessionIgnoreSet.has(key)) {
          this.emit('setItem', {
            fromId: data.fromId, message: { name: key, value: session[key] },
          });
        }
      });
      this.emit('sessionRestored');
    });
  }

  /**
   * @param {Array} sessionKeysToIgnore List of session keys to not synchronize (blacklist)
   */
  synchronizeThisTab(sessionKeysToIgnore) {
    if (sessionKeysToIgnore) {
      this.sessionIgnoreSet = new Set(sessionKeysToIgnore);
    } else {
      this.sessionIgnoreSet = new Set();
    }
    this.broadcast('newTab');
  }

  // eslint-disable-next-line class-methods-use-this
  getTabsCount() {
    const tabs = parseInt(this._localStorage.getItem('tabs'), 10);
    if (!tabs) {
      return 0;
    }
    return tabs;
  }

  // eslint-disable-next-line class-methods-use-this
  _increaseGlobalTabCount() {
    let tabs = this.getTabsCount();
    if (!tabs) {
      tabs = 1;
    } else {
      tabs++; // eslint-disable-line no-plusplus
    }
    this._localStorage.setItem('tabs', tabs);
  }

  // eslint-disable-next-line class-methods-use-this
  _decreaseGlobalTabCount() {
    let tabs = this.getTabsCount();
    if (!tabs) {
      tabs = 0;
    } else {
      tabs--; // eslint-disable-line no-plusplus
    }
    this._localStorage.setItem('tabs', tabs);
  }

  // eslint-disable-next-line class-methods-use-this
  _resetTabsCounter() {
    this._localStorage.setItem('tabs', 0);
  }

  _closingOrNavigating() {
    // this._decreaseGlobalTabCount();
    this._resetTabsCounter();
    // tabRemoved will immediately cause other tabs to register
    this.broadcast('tabRemoved');
  }

  _messageReceived(event) {
    if (!event) { // for ie
      event = global.event; // eslint-disable-line no-param-reassign
    }
    if (!event.newValue) {
      return; // do nothing if no value to work with
    }

    const [eventName, fromId, toId] = event.key.split('|');

    // make sure it didn't come from us. Is this possible?
    // make sure it is for us if there is a specific recipient.
    if (
      fromId && eventName && fromId !== this.id &&
      (!toId || toId === 'undefined' || toId === this.id)
    ) {
      this.emit(eventName, { fromId, message: JSON.parse(event.newValue).message });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _triggerMessage(name, message) {
    this._localStorage.setItem(name, JSON.stringify({ message: message || {} }));
    this._localStorage.removeItem(name);
  }

  sendTo(toId, event, message) {
    // Can't send messages to yourself
    if (toId !== this.id) {
      this._triggerMessage(`${event}|${this.id}|${toId}`, message);
    }
  }

  broadcast(event, message) {
    this._triggerMessage(`${event}|${this.id}`, message);
  }

  setItem(name, value) {
    this._sessionStorage.setItem(name, value);
    this.broadcast('setItem', { name, value });
  }

  // eslint-disable-next-line class-methods-use-this
  getItem(name) {
    return this._sessionStorage.getItem(name);
  }

  removeItem(name) {
    this._sessionStorage.removeItem(name);
    this.broadcast('removeItem', { name });
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

export default new SessionStorageSynch({});

export {
  SessionStorageSynch as _sessionStorageSynch,
};
