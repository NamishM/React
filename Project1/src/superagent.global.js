import superagent from 'superagent';
import agent from 'superagent-use';
import superagentPromisePlugin from 'superagent-promise-plugin';
import prefix from 'superagent-prefix';

global.superagent = agent(superagent);

// https://visionmedia.github.io/superagent/
global.superagent.use(prefix(global.config.apiUri));
global.superagent.use(superagentPromisePlugin);
