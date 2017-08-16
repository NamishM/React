
import { _sessionStorageSynch } from '../sessionStorageSynch';
import Events from 'minivents';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

class StoragePolyFill extends Events {
  constructor({ data }) {
    super();
    this._data = data || {};
  }
  setItem(id, val) {
    this.emit('storage', {
      key: id,
      oldValue: this.getItem(id),
      newValue: String(val),
    });
    this._data[id] = String(val);
  }
  getItem(id) {
    return this._data[id] || undefined;
  }
  removeItem(id) {
    delete this._data[id];
  }
  clear() {
    this._data = {};
  }
}

class WindowPolyfill extends Events {
  constructor({ localStoragePolyFill }) {
    super();
    localStoragePolyFill.on('storage', (event) => {
      this.emit('storage', event);
    });
    this.addEventListener = this.addEventListener.bind(this);
    this.attachEvent = this.attachEvent.bind(this);
    this.unload = this.unload.bind(this);
  }
  unload() {
    this.emit('beforeunload');
  }
  addEventListener(event, callback) {
    this.on(event, callback);
  }
  attachEvent(event, callback) {
    this.on(event, callback);
  }
}

function generateBrowser({ commonLocalStorage }) {
  const tab1SessionStorage = new StoragePolyFill({});

  const tab1SessionSynch = new _sessionStorageSynch({
    localStorage: commonLocalStorage,
    sessionStorage: tab1SessionStorage,
    window: new WindowPolyfill({ localStoragePolyFill: commonLocalStorage }),
  });

  return {
    sessionStorage: tab1SessionStorage,
    localStorage: commonLocalStorage,
    sessionSynch: tab1SessionSynch,
  };
}

function after(count, callback) {
  let hits = 0;
  return () => {
    hits += 1;
    if (hits === count) {
      callback();
    }
  };
}

describe('sessionStorageSynch', () => {
  describe(' - polyfill Tests', () => {
    it('should create a storage object with data.', () => {
      const tab1SessionStorage = new StoragePolyFill({ data: { val: 1, val2: 2 } });

      expect(tab1SessionStorage._data).toEqual({ val: 1, val2: 2 });
    });

    it('should event to the window when data is added', (done) => {
      const tab1LocalStorage = new StoragePolyFill({});
      const tab1WindowPolyfill = new WindowPolyfill({ localStoragePolyFill: tab1LocalStorage });

      tab1WindowPolyfill.addEventListener('storage', (event) => {
        expect(event).toEqual({ key: 'val1', oldValue: undefined, newValue: '1' });
        done();
      });

      tab1WindowPolyfill.attachEvent('storage', (event) => {
        expect(event).toEqual({ key: 'val1', oldValue: undefined, newValue: '1' });
        done();
      });

      tab1LocalStorage.setItem('val1', 1);
    });
  });

  it('should synchronize data between two tabs', (done) => {
    const commonLocalStorage = new StoragePolyFill({});


    const tab1 = generateBrowser({ commonLocalStorage });
    const tab2 = generateBrowser({ commonLocalStorage });

    const exit = after(2, done);

    tab1.sessionSynch.on('setItem', (event) => {
      expect(event).toEqual({
        fromId: tab2.sessionSynch.id,
        message: {
          name: 'val2',
          value: 2,
        },
      });
      setTimeout(() => {
        expect(tab1.sessionStorage.getItem('val1')).toEqual('1');
        expect(tab1.sessionStorage.getItem('val2')).toEqual('2');
        exit();
      });
    });

    tab2.sessionSynch.on('setItem', (event) => {
      expect(event).toEqual({
        fromId: tab1.sessionSynch.id,
        message: {
          name: 'val1',
          value: 1,
        },
      });
      setTimeout(() => {
        expect(tab2.sessionStorage.getItem('val1')).toEqual('1');
        expect(tab2.sessionStorage.getItem('val2')).toEqual('2');
        exit();
      });
    });

    tab1.sessionSynch.setItem('val1', 1);
    tab2.sessionSynch.setItem('val2', 2);
  });

  it('should synchronize data between three tabs', (done) => {
    const commonLocalStorage = new StoragePolyFill({});


    const tab1 = generateBrowser({ commonLocalStorage });
    const tab2 = generateBrowser({ commonLocalStorage });
    const tab3 = generateBrowser({ commonLocalStorage });

    tab1.sessionSynch.setItem('val1', 1);
    tab2.sessionSynch.setItem('val2', 2);
    tab3.sessionSynch.setItem('val3', 3);

    setTimeout(() => {
      expect(tab1.sessionStorage.getItem('val1')).toEqual('1');
      expect(tab1.sessionStorage.getItem('val2')).toEqual('2');
      expect(tab1.sessionStorage.getItem('val3')).toEqual('3');

      expect(tab2.sessionStorage.getItem('val1')).toEqual('1');
      expect(tab2.sessionStorage.getItem('val2')).toEqual('2');
      expect(tab2.sessionStorage.getItem('val3')).toEqual('3');

      expect(tab3.sessionStorage.getItem('val1')).toEqual('1');
      expect(tab3.sessionStorage.getItem('val2')).toEqual('2');
      expect(tab3.sessionStorage.getItem('val3')).toEqual('3');
      done();
    }, 5);
  });

  it('should handle getTabsCount method', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch.getTabsCount()).toEqual(1);
  });

  it('should handle _decreaseGlobalTabCount method with tabs available', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch._decreaseGlobalTabCount());
  });
  it('should handle broadcast method', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch.broadcast('beforeunload', 'hello mocha'));
  });

  it('should handle sendTo method', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch.sendTo('testID', 'beforeunload', 'hello mocha'));
  });

  it('should handle closingOrNavigating method', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch._closingOrNavigating());
  });

  it('should handle messageReceived method with param', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch._messageReceived('beforeunload'));
  });

  it('should handle removeItem method', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    tab1.sessionSynch.setItem('val1', 1);
    tab1.sessionSynch.removeItem('val1');
    expect(tab1.sessionSynch.getItem('val1')).toEqual(undefined);
  });

  it('should handle synchronizeThisTab method without param', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch.synchronizeThisTab());
  });

  it('should handle synchronizeThisTab method with param', () => {
    const commonLocalStorage = new StoragePolyFill({});
    const tab1 = generateBrowser({ commonLocalStorage });
    expect(tab1.sessionSynch.synchronizeThisTab('abc'));
  });
});
