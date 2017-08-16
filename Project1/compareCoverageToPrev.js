const fs = require('fs');
const path = require('path');
const npmRun = require('npm-run');

const readFile = filePath => new Promise((resolve, reject) =>
  fs.readFile(filePath, 'utf8', (err, data) =>
    (err ? reject(err) : resolve(data))
  )
);

const sourcePath = path.join(__dirname, 'coverage', 'coverage-summary-prev.json');

readFile(sourcePath).then((contents) => {
  const { total: { lines, statements, functions, branches } } = JSON.parse(contents);
  const statement = `nyc check-coverage --lines ${lines.pct} --functions ${functions.pct} --branches ${branches.pct} --statements ${statements.pct}`;

  console.log('\x1b[33m%s\x1b[0m: ', statement);
  npmRun.exec(statement, (err) => {
    if (err) {
      throw err;
    }
  });
});
