const Slack = require('slack-node');
const path = require('path');
const fs = require('fs');

const thresholds = [
  {
    percent: 100,
    color: 'good',
  },
  {
    percent: 80,
    color: 'warning',
  },
  {
    percent: 50,
    color: 'warning',
  },
  {
    percent: 40,
    color: 'danger',
  },
  {
    percent: 0,
    color: 'danger',
  },
];

class SlackWebhook {
  send({ lines, statements, functions, branches }) {
    return new Promise((resolve, reject) => {
      const slack = new Slack();
      slack.setWebhook('https://hooks.slack.com/services/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');

      const lowestPct = [lines.pct, statements.pct, functions.pct, branches.pct]
        .map(pct => parseFloat(pct, 10))
        .reduce((prev, next) => (next < prev ? next : prev), 0);

      const color = thresholds
        .reduce((prev, next) => (next.percent > lowestPct ? next.color : prev), 'danger');

      const payload = {
        channel: 'builds',
        username: 'Unit Test Coverage Report',
        icon_emoji: ':all_the_things:',
        attachments: [
          {
            mrkdwn_in: ['text', 'author_name'],
            author_name: 'of SRSUI - Main',
            text: `
*${statements.pct}%* Statements \`${statements.covered}/${statements.total}\`    *${branches.pct}%* Branches \`${branches.covered}/${branches.total}\`
*${functions.pct}%* Functions \`${functions.covered}/${functions.total}\`    *${lines.pct}%* Lines \`${lines.covered}/${lines.total}\`

Full report: http://srsdevwiki.srssoft.com/Mobile/coverage/lcov-report/index.html
`,
            color,
          },
        ],
      };

      const slackRequestTimeout = setTimeout(() => {
        reject(new Error('Slack request timeout'));
      }, parseInt(5000, 10));

      slack.webhook(payload, (err) => {
        if (err) {
          return reject(err);
        }
        clearTimeout(slackRequestTimeout);

        return resolve();
      });
    });
  }
}

const readFile = filePath => new Promise((resolve, reject) =>
  fs.readFile(filePath, 'utf8', (err, data) =>
    (err ? reject(err) : resolve(data))
  )
);

const sourcePath = path.join(__dirname, 'coverage', 'coverage-summary.json');

readFile(sourcePath).then((contents) => {
  const { total: { lines, statements, functions, branches } } = JSON.parse(contents);
  // console.log({ lines, statements, functions, branches });
  const slackWebHook = new SlackWebhook();
  slackWebHook.send({ lines, statements, functions, branches });
});

// module.exports = SlackWebhook;

