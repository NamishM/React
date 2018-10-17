import Loadable from 'react-loadable';
import path from 'path';
import Loading from '../../modules/loader/components/Loader';
import { fakeDelay } from '../../utilities';

export const LoginPage = Loadable({
  loader: () => fakeDelay(400).then(() => import(/* webpackChunkName: "Login" */ '../../modules/login/containers/Login')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/login/containers/Login')
});

export const AppPage = Loadable({
  loader: () => fakeDelay(400).then(() => import(/* webpackChunkName: "App" */ '../../modules/landing/containers/MainView')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/landing/containers/MainView')
});

export const TalentPage = Loadable({
  loader: () => fakeDelay(400).then(() => import(/* webpackChunkName: "Talent" */ '../../modules/talent/components/Talent')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/talent/components/Talent')
});

export const EmployerPage = Loadable({
  loader: () => fakeDelay(400).then(() => import(/* webpackChunkName: "Employer" */ '../../modules/employer/components/Employer')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/employer/components/Employer')
});

export const AdminPage = Loadable({
  loader: () => fakeDelay(400).then(() => import(/* webpackChunkName: "Admin" */ '../../modules/admin/components/Admin')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/components/Admin')
});
