import { singleLineString } from '../../../utilities';

// Reminder: exported functions must be named
export const getDataSource = () =>
  global.superagent
    .get('/DataSource')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

export const getUserProfile = userId =>
  global.superagent
    .get(singleLineString`/UserProfile/${userId}?_include=
    clinicalSummarySource,
    desktopPrimary,
    desktopAlternate,
    ptDefaultView,
    taskingRefreshInterval,
    canCreateTasks,
    canDeleteTasks,
    canUpdateTasks`)
    .set('Accept', 'application/json')
    .then((resp) => {
      const [result] = JSON.parse(resp.text);
      return {
        ...result,
        desktopPrimary: parseInt(result.desktopPrimary, 10),
        desktopAlternate: parseInt(result.desktopAlternate, 10),
        ptDefaultView: parseInt(result.ptDefaultView, 10),
        taskingRefreshInterval: parseInt(result.taskingRefreshInterval, 10),
        canCreateTasks: !!parseInt(result.canCreateTasks, 10),
        canDeleteTasks: !!parseInt(result.canDeleteTasks, 10),
        canUpdateTasks: !!parseInt(result.canUpdateTasks, 10),
      };
    });

export const getAvailableProperty = () =>
  global.superagent
    .get('/AvailableProperty?PropertyName=EnableTasking')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
