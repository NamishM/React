import App from './containers/App';
import LogoutButton from './containers/LogoutButton';
import {
  getDataSources,
  setIdentityServerModel,
  loginFailed,
} from 'srs/redux/user/actions';

// Identity Server injects a JSON object on page
const getIdSvrJson = () => {
  const idSvrDataString = document.getElementById('modelJson');
  let encodedJson = '';

  if (idSvrDataString.textContent !== undefined) {
    encodedJson = idSvrDataString.textContent;
  } else {
    encodedJson = idSvrDataString.innerHTML;
  }
  // Identity Server should replace {model} when rendering the html page
  if (encodedJson.trim() !== '{model}') {
    const idSvrJson = JSON.parse(encodedJson);
    return idSvrJson;
  }
  return null;
};

const composite = {
  App,
  LogoutButton,
  init: (store) => {
    store.dispatch(getDataSources());

    const idSvrData = getIdSvrJson();
    if (idSvrData === null) {
      throw new Error('Identity Server Model Data Expected injected into modelJson script tag');
    }

    store.dispatch(setIdentityServerModel(idSvrData));
    if (idSvrData.errorMessage !== null) {
      store.dispatch(loginFailed(idSvrData.model.errorMessage, 1));
    }
  },
};

export default composite;
