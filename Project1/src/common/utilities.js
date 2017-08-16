// similar to .join, but filters out empty values
export const filterJoin = (sep, ...values) => (
  [...values].reduce((prev, next) => (
    // Ignore falsy items
    next ? [...prev, next] : prev
  ), []).join(sep)
);

// from: http://stackoverflow.com/a/22265753/402706
export const queryString = {};

queryString.parse = (str) => {
  if (typeof str !== 'string') {
    return {};
  }

  // eslint-disable-next-line no-param-reassign
  str = str.trim().replace(/^\?/, '');

  if (!str) {
    return {};
  }

  return str.trim().split('&').reduce((ret, param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    let key = parts[0];
    let val = parts[1];

    key = decodeURIComponent(key);
    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!{}.hasOwnProperty.call(ret, key)) {
      ret[key] = val; // eslint-disable-line no-param-reassign
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val]; // eslint-disable-line no-param-reassign
    }

    return ret;
  }, {});
};

queryString.stringify = obj => (
  obj ? Object.keys(obj).map((key) => {
    const val = obj[key];

    if (Array.isArray(val)) {
      return val.map(val2 => `${encodeURIComponent(key)}=${encodeURIComponent(val2)}`)
        .join('&');
    }

    return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  }).join('&') : ''
);

queryString.push = (key, newValue, window) => {
  const params = queryString.parse(window.location.search);
  params[key] = newValue;
  const newParamsString = queryString.stringify(params);
  window.history.pushState({}, '', `${window.location.pathname}?${newParamsString}`);
};

queryString.replace = (key, newValue, window) => {
  const params = queryString.parse(window.location.search);
  params[key] = newValue;
  const newParamsString = queryString.stringify(params);
  window.history.replaceState({}, '', `${window.location.pathname}?${newParamsString}`);
};

// http://stackoverflow.com/a/736970/402706
export const getLocation = (href) => {
  const l = document.createElement('a');
  l.href = href;
  return l;
};
// base tag to know what the root of the application is
// regex: http://stackoverflow.com/a/11531417/402706
const baseTags = document.getElementsByTagName('base');
const baseHref = baseTags.length > 0 ? baseTags[0].href : '/';
export const basePath = getLocation(baseHref).pathname.replace(/^\/?/, '/'); // regex adds "/" prefix if missing.

// Lookup for IE Browser
export const detectIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
};
