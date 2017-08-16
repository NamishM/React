import useRouterHistory from 'react-router/lib/useRouterHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { basePath } from 'srs/common/utilities';

const browserHistory = useRouterHistory(createBrowserHistory)({ basename: basePath });

export default browserHistory;
