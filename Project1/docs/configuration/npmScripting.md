# NPM Scripting

NPM can be used as a task runner in place of [grunt](http://gruntjs.com/) or [gulp](http://gulpjs.com/).
Task runners perform operations like building, deploying, testing, linting, etc.

npm tasks are un on the command line via the syntax `npm run [taskname]` and are configured in `package.json`
via the `scripts` section

```
  "scripts": {
    "start": "node ./server.js",
    "build": "cross-env NODE_ENV=production webpack -p --config webpack.production.config.js",
    "build:deploy": "npm run build && npm run deploy",
    "deploy": "cross-env copyfiles -f {./dist/*.*,./src/config.js} /inetpub/wwwroot/SRSUI/Mobile/static && cross-env copyfiles -f ./src/index.html /inetpub/wwwroot/SRSUI/Mobile",
    "test": "cross-env NODE_ENV=test node ./node_modules/mocha/bin/_mocha ./src/**/*.spec.js -r mocha-clean -r ./test.setup.js --recursive --compilers js:babel-register ",
    "test:n6": "cross-env NODE_ENV=test node --nowarn_template_set ./node_modules/mocha/bin/_mocha ./src/**/*.spec.js -r mocha-clean -r ./test.setup.js --recursive --compilers js:babel-register ",
    "test:watch": "npm run test -- --watch",
    "cover": "cross-env NODE_ENV=test nyc --require babel-core/register mocha ./src/**/*.spec.js --recursive --compilers js:babel-register --require ./test.setup.js --reporter mochawesome ",
    "cover:deploy": "npm run build && npm run cover && npm run coverDeploy",
    "coverDeploy": "cross-env copyfiles {./dist/stats.html,./coverage/**/*.*,./mochawesome-reports/**/*.*} //srsdevwiki.srs.com/C$/inetpub/wwwroot/Mobile/docsBuild",
    "lint": "cross-env NODE_ENV=development eslint --ext .js,.jsx src/**",
    "lint:fix": "npm run lint -- --fix",
    "buildDocs": "cross-env NODE_ENV=development node marked.setup.js {./docs/**/*.md,./*.md} ./docsBuild && cross-env copyfiles ./docs/anywhere-logo.png ./docsBuild",
    "buildDocs:deploy": "npm run buildDocs && cross-env copyfiles ./docsBuild/**/*.* //srsdevwiki.srs.com/C$/inetpub/wwwroot/Mobile"
  },
```

## Syntax

All commands are run on the commandline so all common functions are available:

- `& [...]  command1 & command2`
  - Use to separate multiple commands on one command line. Cmd.exe runs the first command, and then the second command.
- `&& [...]  command1 && command2`
  - Use to run the command following && only if the command preceding the symbol is successful. Cmd.exe runs the first command, and then runs the second command only if the first command completed successfully.
- `|| [...]  command1 || command2`
  - Use to run the command following || only if the command preceding || fails. Cmd.exe runs the first command, and then runs the second command only if the first command did not complete successfully (receives an error code greater than zero).
- `( ) [...]  (command1 & command2)`
  - Use to group or nest multiple commands.
- `; or , command1 parameter1;parameter2`
  - Use to separate command parameters.

Environment Variables can be set by prefixing a command with `cross-env` and the
name of the environment variable you wish to set. Example: `cross-env NODE_ENV=development`

Third party tools are added to the path automatically so using their name instead of their path
is acceptable: `mocha` vs `node ./node_modules/mocha/bin/_mocha` in most cases.

Commands can also extend other commands:

```
"lint": "cross-env NODE_ENV=development eslint --ext .js,.jsx src/**",
"lint:fix": "npm run lint -- --fix",
```

`npm run lint:fix` results in: `cross-env NODE_ENV=development eslint --ext .js,.jsx src/** --fix`

Commands can also call other commands:

```
"build": "cross-env NODE_ENV=production webpack -p --config webpack.production.config.js",
"deploy": "cross-env copyfiles -f {./dist/*.*,./src/config.js} /inetpub/wwwroot/SRSUI/Mobile/static && cross-env copyfiles -f ./src/index.html /inetpub/wwwroot/SRSUI/Mobile",
"build:deploy": "npm run build && npm run deploy",
```

Most paths can be configured using [glob patterns](http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm)

Example: `./docsBuild/**/*.*` matches all files under `./docsBuild`