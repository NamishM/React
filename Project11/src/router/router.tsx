import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import browserHistory from './browserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import initStore from '../store';
import ErrorPage from '../modules/error/components/ErrorPage';
import NotFound from '../modules/notfound/components/NotFound';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import {
  LoginPage,
  AppPage,
  TalentPage,
  EmployerPage,
  AdminPage
} from './routes';

const store = initStore();

const loggedIn = () => false;

const requireAuth = (nextState: any, replace: any) => {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
};

export const AppRouter: React.StatelessComponent<{}> = () => {

  return (
    <Provider store={store}>
      <ConnectedRouter history={browserHistory} >
        <Switch>
          <Route path="/notfound" component={NotFound} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" render={
            () => {
              const [subdomain] = window.location.hostname.split('.');
              switch(subdomain) {
                case 'talent':
                  return (
                    <EnsureLoggedInContainer component={'TalentPage'}>
                      <TalentPage />
                    </EnsureLoggedInContainer>                    
                  )
                  break;
                case 'employer':
                  return (
                    <EnsureLoggedInContainer component={'EmployerPage'}>
                      <EmployerPage />
                    </EnsureLoggedInContainer> 
                  )
                  break;
                case 'administration':
                  return (
                    <EnsureLoggedInContainer component={'AdminPage'}>
                      <AdminPage />
                    </EnsureLoggedInContainer>
                  )
                  break;    
                default:
                  return (
                    <EnsureLoggedInContainer component={'AppPage'}>
                      <AppPage />
                    </EnsureLoggedInContainer>
                  )
              }
            }
          }
          />
          <Route path="*" render={() => <Redirect to="/notfound" />} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}