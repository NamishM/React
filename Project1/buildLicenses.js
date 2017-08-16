const nlf = require('nlf');

const claimed = {};

// to only include production dependencies
nlf.find({
  directory: '.',
  production: true,
}, (err, data) => {
  // do something with the response object.
  const x = data.map((license) => {
    if (claimed[license.id]) {
      return '';
    }
    claimed[license.id] = true;
    return `
# ${license.id} ${license.licenseSources.package.sources.reduce((prev, next) => (!prev ? next.license : `${prev}, ${next.license}`), '')}

${license.licenseSources.license.sources.reduce((prev, next) => (!prev ? next.text : `${prev}
${next.text}`), '')}
`;
  });
  console.log(x.join(''));
});
